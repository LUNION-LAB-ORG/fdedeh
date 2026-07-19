"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { baseURL } from "@/config";
import { cn } from "@/lib/utils";

type ServedCreative = {
	id: number;
	zone: string;
	image_url: string;
	alt: string | null;
	width: number | null;
	height: number | null;
};

type ServeResponse = {
	creative: ServedCreative | null;
	token?: string;
	click_url?: string;
	impression_url?: string;
};

/** Déduit le contexte de page (type + slug) à partir du chemin (locale déjà retirée par i18n). */
function deriveContext(pathname: string): { type?: string; slug?: string } {
	const parts = pathname.split("/").filter(Boolean);
	if (parts.length === 0) return { type: "home" };

	const typeBySegment: Record<string, string> = {
		articles: "article",
		"actualites-nationales": "article",
		dailies: "daily",
		podcasts: "podcast",
		ppef: "ppef",
	};

	const type = typeBySegment[parts[0]];
	if (!type) return {};
	const slug = parts.length > 1 ? parts[parts.length - 1] : undefined;
	return { type, slug };
}

function currentDevice(): string {
	return typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop";
}

/**
 * Emplacement publicitaire piloté par le serveur : demande LA pub de la zone
 * pour le contexte de page courant, l'affiche, compte l'impression (au scroll)
 * et route le clic via l'URL de tracking. Rien si aucune pub éligible.
 */
export function AdSlot({
	zone,
	type,
	slug,
	className,
	label = true,
}: {
	zone: string;
	type?: string;
	slug?: string;
	className?: string;
	label?: boolean;
}) {
	const pathname = usePathname();
	const [data, setData] = useState<ServeResponse | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const counted = useRef(false);

	// 1) Demande la pub au serveur.
	useEffect(() => {
		const ctx = deriveContext(pathname);
		const params = new URLSearchParams({ zone, device: currentDevice() });
		const t = type ?? ctx.type;
		const s = slug ?? ctx.slug;
		if (t) params.set("type", t);
		if (s) params.set("slug", s);

		let alive = true;
		fetch(`${baseURL}/ads/serve?${params.toString()}`, { cache: "no-store" })
			.then((r) => (r.ok ? r.json() : null))
			.then((d: ServeResponse | null) => {
				if (alive && d?.creative) setData(d);
			})
			.catch(() => {});

		return () => {
			alive = false;
		};
	}, [zone, type, slug, pathname]);

	// 2) Compte l'impression quand la pub devient visible (≥ 50 %).
	useEffect(() => {
		if (!data?.creative || !data.impression_url || !data.token || !containerRef.current) return;
		const el = containerRef.current;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !counted.current) {
						counted.current = true;
						fetch(data.impression_url!, {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								token: data.token,
								page_path: window.location.pathname,
								device: currentDevice(),
							}),
							keepalive: true,
						}).catch(() => {});
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.5 }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, [data]);

	if (!data?.creative) return null;

	const c = data.creative;
	const ratio = c.width && c.height ? `${c.width} / ${c.height}` : "4 / 1";

	return (
		<div ref={containerRef} className={cn("mx-auto w-full", className)}>
			{label && (
				<p className="mb-1 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-brut-muted">Publicité</p>
			)}
			<a
				href={data.click_url}
				target="_blank"
				rel="noopener noreferrer sponsored"
				className="block overflow-hidden rounded-2xl border border-brut-line"
			>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={c.image_url}
					alt={c.alt || "Publicité"}
					loading="lazy"
					style={{ aspectRatio: ratio }}
					className="h-auto w-full object-contain"
				/>
			</a>
		</div>
	);
}

export default AdSlot;

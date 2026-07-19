"use client";

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import ContactButton from "./contact-button";
import { usePathname } from "@/i18n/navigation";
import { baseURL } from "@/config";

const CLE_POPUP_FERME = "fdedeh:popup-ferme";

type Served = {
	creative: { image_url: string; alt: string | null } | null;
	token?: string;
	click_url?: string;
	impression_url?: string;
};

function device(): string {
	return typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop";
}

export default function BannerDialog() {
	const [open, setOpen] = useState(false);
	const [ad, setAd] = useState<Served | null>(null);
	const pathname = usePathname();

	// Demande la pop-up au serveur de diffusion (zone « popup »).
	useEffect(() => {
		fetch(`${baseURL}/ads/serve?zone=popup&device=${device()}`, { cache: "no-store" })
			.then((r) => (r.ok ? r.json() : null))
			.then((d: Served | null) => {
				if (d?.creative) setAd(d);
			})
			.catch(() => {});
	}, []);

	// Ouvre sur l'accueil, une fois par session, après un début de défilement.
	useEffect(() => {
		if (!ad?.creative) return;
		if (pathname !== "/") return;
		if (sessionStorage.getItem(CLE_POPUP_FERME) === "1") return;

		const seuil = () => Math.min(window.innerHeight * 0.6, 700);
		const onScroll = () => {
			if (window.scrollY > seuil()) {
				sessionStorage.setItem(CLE_POPUP_FERME, "1");
				setOpen(true);
				if (ad.impression_url && ad.token) {
					fetch(ad.impression_url, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ token: ad.token, page_path: "/", device: device() }),
						keepalive: true,
					}).catch(() => {});
				}
				window.removeEventListener("scroll", onScroll);
			}
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [ad, pathname]);

	const handleClose = () => {
		sessionStorage.setItem(CLE_POPUP_FERME, "1");
		setOpen(false);
	};

	if (!ad?.creative) return null;

	return (
		<AlertDialog open={open} onOpenChange={handleClose}>
			<AlertDialogTrigger className="hidden" />
			<AlertDialogContent className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl w-full aspect-square p-2.5 max-h-screen">
				<ContactButton />
				<Button
					size="icon"
					className="absolute right-2 top-2 rounded-full bg-custom-gradient z-10"
					onClick={handleClose}
				>
					<span className="sr-only">Close</span>
					<X />
				</Button>
				<AlertDialogHeader className="sr-only">
					<AlertDialogTitle className="sr-only">Bienvenue sur FDedeh!</AlertDialogTitle>
				</AlertDialogHeader>
				<a href={ad.click_url} target="_blank" rel="noopener noreferrer sponsored" className="block h-full w-full">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={ad.creative.image_url}
						alt={ad.creative.alt || "Publicité"}
						className="aspect-square h-full w-full rounded object-cover"
					/>
				</a>
			</AlertDialogContent>
		</AlertDialog>
	);
}

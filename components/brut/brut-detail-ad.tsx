"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useBannerStore } from "@/features/banner/banner.store";
import { addDomainToBackendImagePath } from "@/utils/image-utils";
import { cn } from "@/lib/utils";

// Publicité inline des pages de détail (juste après la description). Reprend la
// bannière HEADER — auparavant affichée sur l'accueil. Le pop-up au scroll n'est
// pas concerné.
export function BrutDetailAd({ className }: { className?: string }) {
  const { getBannerByPosition } = useBannerStore();
  const banner = getBannerByPosition("HEADER");

  if (!banner) return null;

  return (
    <div className={cn("my-8", className)}>
      <p className="mb-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-brut-muted">Publicité</p>
      <Link
        href={banner.link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto block max-w-3xl overflow-hidden rounded-2xl border border-brut-line"
      >
        <Image
          src={addDomainToBackendImagePath(banner.image_path)}
          alt="Publicité"
          width={1232}
          height={260}
          className="h-auto w-full"
        />
      </Link>
    </div>
  );
}

export default BrutDetailAd;

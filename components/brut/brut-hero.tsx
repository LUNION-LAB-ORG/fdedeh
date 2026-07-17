"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { addDomainToBackendImagePath } from "@/utils/image-utils";
import { cn } from "@/lib/utils";

export type BrutHeroProps = {
  imagePath?: string | null;
  eyebrow?: string;
  badges?: string[];
  title: string;
  metas?: string[];
  href: string;
  ctaLabel: string;
  extra?: React.ReactNode;
};

// Le hero s'adapte au ratio de l'image, lu directement depuis l'image chargée
// (naturalWidth / naturalHeight) — aucune mesure serveur nécessaire.
//  · bannière large (ratio ≥ 2) → texte en haut, image pleine largeur en bas ;
//  · carré / portrait / photo    → image et texte côte à côte.
export function BrutHero({ imagePath, eyebrow, badges, title, metas, href, ctaLabel, extra }: BrutHeroProps) {
  const [ratio, setRatio] = useState<number | null>(null);
  const estBanniere = (ratio ?? 0) >= 2;

  const image = (
    <div
      className="relative overflow-hidden rounded-2xl border border-brut-line bg-brut-raise"
      style={{ aspectRatio: ratio ? String(ratio) : "3 / 2" }}
    >
      <Image
        src={addDomainToBackendImagePath(imagePath)}
        alt=""
        fill
        priority
        sizes={estBanniere ? "100vw" : "(max-width: 1024px) 100vw, 44vw"}
        className="object-cover"
        onLoad={(e) => {
          const img = e.currentTarget;
          if (img.naturalWidth && img.naturalHeight) {
            setRatio(img.naturalWidth / img.naturalHeight);
          }
        }}
      />
    </div>
  );

  const texte = (
    <div className={estBanniere ? "max-w-4xl" : undefined}>
      {eyebrow && (
        <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.12em] text-brut-signal">{eyebrow}</p>
      )}
      {badges && badges.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {badges.map((b) => (
            <span
              key={b}
              className="rounded-full bg-brut-raise px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.04em] text-brut-ink-soft"
            >
              {b}
            </span>
          ))}
        </div>
      )}
      <h1
        className={cn(
          "font-display font-black -tracking-[0.035em] text-balance",
          estBanniere
            ? "text-[clamp(30px,4.6vw,54px)] leading-[1.02] line-clamp-4"
            : "text-[clamp(28px,4vw,52px)] leading-[1.0] line-clamp-5"
        )}
      >
        {title}
      </h1>
      {metas && metas.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-brut-muted">
          {metas.map((m, i) => (
            <span key={i} className={i === 0 ? "font-semibold text-brut-ink" : undefined}>
              {m}
            </span>
          ))}
        </div>
      )}
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <Link
          href={href}
          className="inline-flex items-center gap-2 rounded-full bg-brut-ink px-6 py-3 text-[15px] font-bold text-brut-ground"
        >
          {ctaLabel} →
        </Link>
        {extra}
      </div>
    </div>
  );

  return (
    <header className="border-b-[3px] border-brut-ink px-6 py-10 lg:px-11 lg:py-12">
      {estBanniere ? (
        <div className="flex flex-col gap-8">
          {texte}
          {image}
        </div>
      ) : (
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,44%)_1fr] lg:gap-12">
          {image}
          {texte}
        </div>
      )}
    </header>
  );
}

export default BrutHero;

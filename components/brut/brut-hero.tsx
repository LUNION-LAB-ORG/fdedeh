"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { IArticle } from "@/features/articles/types/article.type";
import { addDomainToBackendImagePath } from "@/utils/image-utils";
import { dateFormat } from "@/utils/date-format";
import { cn } from "@/lib/utils";

// Le hero s'adapte au ratio de l'image, lu directement depuis l'image chargée
// (naturalWidth / naturalHeight) — aucune mesure serveur nécessaire.
//  · bannière large (ratio ≥ 2) → texte en haut, image pleine largeur en bas ;
//  · carré / portrait / photo    → image et texte côte à côte.
export function BrutHero({ article }: { article: IArticle }) {
  const [ratio, setRatio] = useState<number | null>(null);
  const estBanniere = (ratio ?? 0) >= 2;

  const image = (
    <div
      className="relative overflow-hidden rounded-2xl border border-brut-line bg-brut-raise"
      style={{ aspectRatio: ratio ? String(ratio) : "3 / 2" }}
    >
      <Image
        src={addDomainToBackendImagePath(article.path_resource)}
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
      <h1
        className={cn(
          "font-display font-black -tracking-[0.035em] text-balance",
          estBanniere
            ? "text-[clamp(32px,4.8vw,56px)] leading-[1.0] line-clamp-4"
            : "text-[clamp(30px,4.2vw,58px)] leading-[0.98] line-clamp-5"
        )}
      >
        {article.title}
      </h1>
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-brut-muted">
        {article.category?.name && <span className="font-semibold text-brut-ink">{article.category.name}</span>}
        <span>{dateFormat(article.created_at)}</span>
        <span>Lecture 4 min</span>
      </div>
      <Link
        href={`/articles/${article.slug}`}
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-brut-ink px-6 py-3 text-[15px] font-bold text-brut-ground"
      >
        Lire l&apos;article →
      </Link>
    </div>
  );

  return (
    <header className="border-b-[3px] border-brut-ink px-6 py-10 lg:px-11 lg:py-12">
      <nav aria-label="Fil d'Ariane" className="mb-7 flex items-center gap-2.5 text-[13.5px] font-semibold">
        <span className="text-brut-ink">À la Une</span>
        {article.category?.name && (
          <>
            <span className="text-brut-muted" aria-hidden>›</span>
            <span className="text-brut-muted">{article.category.name}</span>
          </>
        )}
      </nav>

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

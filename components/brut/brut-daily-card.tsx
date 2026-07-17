import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { IDaily } from "@/features/dailies/types";
import { addDomainToBackendImagePath } from "@/utils/image-utils";
import { dateFormat } from "@/utils/date-format";

function dateISO(value: string) {
  return new Date(value).toISOString().split("T")[0];
}

export function BrutDailyCard({ daily, featured = false }: { daily: IDaily; featured?: boolean }) {
  const rubriques = Array.from(
    new Set((daily.contents ?? []).map((c) => c.hashtag?.hashtag).filter(Boolean))
  ).slice(0, featured ? 4 : 3) as string[];

  const image = daily.contents?.[0]?.path_image;

  const rubriquesOverlay = rubriques.length > 0 && (
    <div className="absolute left-3 top-3 flex max-w-[85%] flex-wrap gap-1.5">
      {rubriques.map((r) => (
        <span
          key={r}
          className="rounded-full bg-black/55 px-2 py-[3px] font-mono text-[10px] font-semibold uppercase tracking-[0.04em] text-white backdrop-blur-sm"
        >
          {r}
        </span>
      ))}
    </div>
  );

  // Variante vedette : horizontale et plus grande (pour ouvrir la section, façon bento).
  if (featured) {
    return (
      <Link
        href={`/dailies/${dateISO(daily.published_at)}`}
        className="group grid h-full overflow-hidden rounded-2xl border border-brut-line bg-brut-surface sm:grid-cols-2"
      >
        <div className="relative aspect-[16/10] overflow-hidden sm:aspect-auto sm:min-h-[280px]">
          <Image
            src={addDomainToBackendImagePath(image)}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {rubriquesOverlay}
        </div>
        <div className="flex flex-col justify-center gap-3 p-6 lg:p-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-brut-signal">● A Barthelemy Inabo</div>
          <h3 className="line-clamp-5 font-display text-[clamp(19px,2.2vw,27px)] font-black leading-[1.12] -tracking-[0.02em] text-brut-ink">
            {daily.introduction}
          </h3>
          <div className="flex items-center gap-3.5 font-mono text-[12px] text-brut-muted">
            <span>{dateFormat(daily.published_at)}</span>
            <span>{daily.view_count ?? 0} vues</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/dailies/${dateISO(daily.published_at)}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brut-line bg-brut-surface"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={addDomainToBackendImagePath(image)}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {rubriquesOverlay}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 px-4 pb-4 pt-[15px]">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-brut-signal">● A Barthelemy Inabo</div>
        <h3 className="line-clamp-3 text-[16px] font-extrabold leading-[1.25] -tracking-[0.01em] text-brut-ink">
          {daily.introduction}
        </h3>
        <div className="mt-auto flex items-center gap-3.5 font-mono text-[11.5px] text-brut-muted">
          <span>{dateFormat(daily.published_at)}</span>
          <span>{daily.view_count ?? 0} vues</span>
        </div>
      </div>
    </Link>
  );
}

export default BrutDailyCard;

import React from "react";
import { Link } from "@/i18n/navigation";
import { IDaily } from "@/features/dailies/types";
import { dateFormat } from "@/utils/date-format";

function dateISO(value: string) {
  return new Date(value).toISOString().split("T")[0];
}

export function BrutDailyCard({ daily }: { daily: IDaily }) {
  const rubriques = Array.from(
    new Set((daily.contents ?? []).map((c) => c.hashtag?.hashtag).filter(Boolean))
  ).slice(0, 4) as string[];

  return (
    <Link
      href={`/dailies/${dateISO(daily.published_at)}`}
      className="group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-2xl border border-brut-line p-5 text-white"
      style={{ background: "radial-gradient(120% 120% at 15% 0%, #241a10 0%, #0d0a06 70%)" }}
    >
      {rubriques.length > 0 && (
        <div className="absolute left-4 top-4 flex max-w-[80%] flex-wrap gap-1.5">
          {rubriques.map((r) => (
            <span
              key={r}
              className="rounded-full bg-white/[0.14] px-2 py-[3px] font-mono text-[10.5px] font-semibold uppercase tracking-[0.04em] text-white backdrop-blur-sm"
            >
              {r}
            </span>
          ))}
        </div>
      )}

      <div className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-brut-signal">
        ● Le Daily · {dateFormat(daily.published_at)}
      </div>
      <h3 className="mb-3 line-clamp-5 font-display text-[23px] font-black leading-[1.06] -tracking-[0.025em]">
        {daily.introduction}
      </h3>
      <div className="flex items-center gap-3.5 font-mono text-[11.5px] text-white/60">
        <span>{daily.view_count ?? 0} vues</span>
        <span>{(daily.contents ?? []).length} sujets</span>
        <span className="transition-transform group-hover:translate-x-0.5">Lire →</span>
      </div>
    </Link>
  );
}

export default BrutDailyCard;

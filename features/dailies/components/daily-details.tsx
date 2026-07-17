"use client";
import React from "react";
import { Link } from "@/i18n/navigation";
import { useDailyStore } from "@/features/dailies/store/dailiesStore";
import { useDailyParDateQuery } from "@/features/dailies/query/daily-par-date.query";
import { IDailyContent } from "@/features/dailies/types";
import LoadingIndicator from "@/components/loading-indicator";
import DailyContent from "@/features/dailies/components/daily-content";
import DailyIntroduction from "@/features/dailies/components/daily-introduction";
import SocialShare from "@/features/articles/components/social-share";
import AvisForm from "@/features/commentaire/components/avis-form";
import AvisList from "@/features/commentaire/components/avis-list";
import { BrutDatePicker } from "@/components/brut/brut-date-picker";
import { BrutAside } from "@/components/brut/brut-aside";
import { useStats } from "@/hooks/use-stats";
import { dateFormat } from "@/utils/date-format";

function DailyDetails({ dailyDate }: { dailyDate: string }) {
  const { isLoading, isFetching, getDailyByDate } = useDailyStore();

  // Le store ne contient que les 10 derniers dailies : sans ce repli sur l'API, toute date
  // plus ancienne affichait « Aucun daily » alors que le daily existe bel et bien.
  const dailyDuStore = getDailyByDate(dailyDate);
  const { data: dailyDistant, isLoading: chargementDistant } = useDailyParDateQuery(dailyDuStore ? "" : dailyDate);
  const daily = dailyDuStore ?? dailyDistant;

  useStats({ type: "DAILY", id: daily?.id });

  if (isLoading || isFetching || chargementDistant) {
    return <LoadingIndicator />;
  }

  const rubriques = daily
    ? (Array.from(
        new Set((daily.contents ?? []).map((c) => c.hashtag?.hashtag).filter(Boolean))
      ).slice(0, 5) as string[])
    : [];

  return (
    <article className="px-6 py-10 lg:px-11 lg:py-12">
      <div className="mx-auto max-w-6xl">
        <nav aria-label="Fil d'Ariane" className="mb-6 flex items-center gap-2.5 text-[13.5px] font-semibold">
          <Link href="/dailies" className="text-brut-ink transition-colors hover:text-brut-signal">
            Le Daily
          </Link>
          <span className="text-brut-muted" aria-hidden>›</span>
          <span className="text-brut-muted">Archives</span>
        </nav>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 font-mono text-[12px] uppercase tracking-[0.12em] text-brut-signal">L&apos;édition du jour</p>
            <h1 className="font-display text-[clamp(32px,5vw,56px)] font-black -tracking-[0.04em]">
              {daily ? dateFormat(daily.published_at) : "Le Daily"}
            </h1>
          </div>
          <BrutDatePicker selected={dailyDate} label="Un autre jour" />
        </div>

        {rubriques.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {rubriques.map((r) => (
              <span
                key={r}
                className="rounded-full bg-brut-raise px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.04em] text-brut-ink-soft"
              >
                {r}
              </span>
            ))}
          </div>
        )}

        {daily ? (
          <>
            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
              <div className="min-w-0">
                <DailyIntroduction introduction={daily.introduction} />
                <div className="mt-8 space-y-12">
                  {daily.contents.map((content: IDailyContent, index: number) => (
                    <DailyContent key={content.id} content={content} index={index} />
                  ))}
                </div>
                <div className="mt-10">
                  <SocialShare />
                </div>
              </div>

              <div className="lg:sticky lg:top-6 lg:self-start">
                <BrutAside />
              </div>
            </div>

            <div className="mt-14 max-w-3xl">
              <AvisForm data={daily} type="daily" />
              <div className="mt-12">
                <AvisList entityId={daily.id.toLocaleString()} entityType="DAILY" />
              </div>
            </div>
          </>
        ) : (
          <p className="mt-10 text-brut-muted">Aucun Daily trouvé pour cette date.</p>
        )}
      </div>
    </article>
  );
}

export default DailyDetails;

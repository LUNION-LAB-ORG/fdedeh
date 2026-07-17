"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { useDailyStore } from "@/features/dailies/store/dailiesStore";
import { useDailyParDateQuery } from "@/features/dailies/query/daily-par-date.query";
import { IDailyContent } from "@/features/dailies/types";
import LoadingIndicator from "@/components/loading-indicator";
import DailyCarouselWithPagination from "@/features/dailies/components/carousel/daily-carousel-with-pagination";
import DailyContent from "@/features/dailies/components/daily-content";
import DailyIntroduction from "@/features/dailies/components/daily-introduction";
import SocialShare from "@/features/articles/components/social-share";
import AvisForm from "@/features/commentaire/components/avis-form";
import AvisList from "@/features/commentaire/components/avis-list";
import { useStats } from "@/hooks/use-stats";
import { dateFormat } from "@/utils/date-format";

function DailyDetails({ dailyDate }: { dailyDate: string }) {
  const { isLoading, isFetching, getDailyByDate } = useDailyStore();
  const router = useRouter();

  // Le store ne contient que les 10 derniers dailies : sans ce repli sur l'API, toute date
  // plus ancienne affichait « Aucun daily » alors que le daily existe bel et bien.
  const dailyDuStore = getDailyByDate(dailyDate);
  const { data: dailyDistant, isLoading: chargementDistant } = useDailyParDateQuery(dailyDuStore ? "" : dailyDate);
  const daily = dailyDuStore ?? dailyDistant;

  const [selectedDate, setSelectedDate] = useState<string>("");

  useStats({ type: "DAILY", id: daily?.id });

  useEffect(() => {
    const d = new Date(dailyDate);
    if (!isNaN(d.getTime())) setSelectedDate(d.toISOString().split("T")[0]);
  }, [dailyDate]);

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
      <div className="mx-auto max-w-3xl">
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
          <input
            type="date"
            aria-label="Choisir une date"
            className="rounded-full border border-brut-line bg-brut-surface px-4 py-2.5 text-[14px] text-brut-ink"
            value={selectedDate}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => e.target.value && router.push(`/dailies/${e.target.value}`)}
          />
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
      </div>

      {daily ? (
        <>
          <div className="mx-auto mt-8 max-w-4xl">
            <DailyCarouselWithPagination daily={daily} />
          </div>

          <div className="mx-auto mt-10 max-w-3xl">
            <DailyIntroduction introduction={daily.introduction} />
            <div className="mt-8 space-y-9">
              {daily.contents.map((content: IDailyContent, index: number) => (
                <DailyContent key={content.id} content={content} index={index} />
              ))}
            </div>

            <div className="mt-10">
              <SocialShare />
            </div>
            <div className="mt-10">
              <AvisForm data={daily} type="daily" />
            </div>
            <div className="mt-12">
              <AvisList entityId={daily.id.toLocaleString()} entityType="DAILY" />
            </div>
          </div>
        </>
      ) : (
        <div className="mx-auto mt-10 max-w-3xl">
          <p className="text-brut-muted">Aucun Daily trouvé pour cette date.</p>
        </div>
      )}
    </article>
  );
}

export default DailyDetails;

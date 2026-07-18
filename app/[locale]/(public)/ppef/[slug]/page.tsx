import React from "react";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { obtenirPpefDetailAction } from "@/features/ppef/ppef.action";
import { PpefInformationBlock } from "@/components/brut/ppef-information-block";
import { StatsTracker } from "@/components/brut/stats-tracker";
import { BrutStats } from "@/components/brut/brut-stats";
import { BrutLikeButton } from "@/components/brut/brut-like-button";
import { BrutFil } from "@/components/brut/brut-fil";
import { ScrollToHash } from "@/components/brut/scroll-to-hash";
import { dateFormat } from "@/utils/date-format";

export default async function PpefDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await obtenirPpefDetailAction(slug);
  const pub = res.success ? res.data?.data : null;

  if (!pub) {
    notFound();
  }

  const informations = pub.informations ?? [];

  return (
    <article className="px-6 py-10 lg:px-11 lg:py-12">
      <StatsTracker type="PPEF" id={pub.id} />
      <ScrollToHash id="commentaires" />
      <div className="mx-auto max-w-3xl">
        <nav aria-label="Fil d'Ariane" className="mb-6 flex items-center gap-2.5 text-[13.5px] font-semibold">
          <Link href="/ppef" className="text-brut-ink transition-colors hover:text-brut-signal">PPEF</Link>
          <span className="text-brut-muted" aria-hidden>›</span>
          <span className="text-brut-muted">Audience</span>
        </nav>

        <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.12em] text-brut-signal">
          Pôle Pénal Économique et Financier
        </p>
        <h1 className="font-display text-[clamp(28px,4.4vw,50px)] font-black leading-[1.04] -tracking-[0.035em] text-balance">
          {pub.title}
        </h1>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-brut-muted">
          {pub.author_name && <span className="font-semibold text-brut-ink">{pub.author_name}</span>}
          {pub.published_at && <span>{dateFormat(pub.published_at)}</span>}
          <span>{informations.length} information{informations.length > 1 ? "s" : ""}</span>
          <BrutStats views={pub.view_count} comments={pub.comments_count} />
          <BrutLikeButton likeableType="PPEF" likeableId={pub.id} initialCount={pub.likes_count ?? 0} />
        </div>

        {informations.length > 0 ? (
          <div className="mt-10 space-y-12">
            {informations.map((info, i) => (
              <PpefInformationBlock key={info.id} info={info} index={i} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-brut-muted">Aucune information pour cette publication.</p>
        )}

        <div id="commentaires" className="mt-16 scroll-mt-24 border-t border-brut-line pt-10">
          <h2 className="mb-6 font-display text-[clamp(20px,3vw,26px)] font-black -tracking-[0.03em]">
            Commentaires sur la publication
          </h2>
          <BrutFil entityData={pub} entityType="PPEF" />
        </div>
      </div>
    </article>
  );
}

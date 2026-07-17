import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { obtenirUnArticleAction } from "@/features/articles/actions/article.action";
import { youtubeEmbed } from "@/utils/youtube";
import { dateFormat } from "@/utils/date-format";
import { StatsTracker } from "@/components/brut/stats-tracker";
import { BrutLikeButton } from "@/components/brut/brut-like-button";
import { BrutStats } from "@/components/brut/brut-stats";
import { BrutFil } from "@/components/brut/brut-fil";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const res = await obtenirUnArticleAction(slug);
  const podcast = res.data;
  return podcast
    ? {
        title: podcast.title,
        description: "Un podcast de fd.info",
        openGraph: { title: `${podcast.title} - fd.info`, type: "video.other" },
      }
    : {};
}

export default async function PodcastDetailPage({ params }: Props) {
  const { slug } = await params;
  const res = await obtenirUnArticleAction(slug);
  const podcast = res.data;

  if (!podcast) {
    notFound();
  }

  const embed = youtubeEmbed(podcast.path_resource);

  return (
    <article className="px-6 py-10 lg:px-11 lg:py-12">
      <StatsTracker type="ARTICLE" id={podcast.id} />
      <div className="mx-auto max-w-3xl">
        <nav aria-label="Fil d'Ariane" className="mb-6 flex items-center gap-2.5 text-[13.5px] font-semibold">
          <Link href="/podcasts" className="text-brut-ink transition-colors hover:text-brut-signal">
            Podcasts
          </Link>
        </nav>
        <h1 className="font-display text-[clamp(28px,4.4vw,50px)] font-black leading-[1.03] -tracking-[0.035em] text-balance">
          {podcast.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-brut-muted">
          <span>{dateFormat(podcast.created_at)}</span>
          <BrutStats views={podcast.view_count} comments={podcast.comments_count} />
          <BrutLikeButton likeableType="ARTICLE" likeableId={podcast.id} initialCount={podcast.likes_count ?? 0} />
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-4xl">
        {embed ? (
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-brut-line bg-black">
            <iframe
              src={embed}
              title={podcast.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        ) : (
          <div className="rounded-2xl border border-brut-line bg-brut-raise p-10 text-center text-brut-muted">
            La vidéo de ce podcast n&apos;est pas disponible.
          </div>
        )}
      </div>

      {podcast.content && (
        <div className="mx-auto mt-10 max-w-3xl">
          <div className="brut-article-body" dangerouslySetInnerHTML={{ __html: podcast.content }} />
        </div>
      )}

      <div className="mx-auto mt-12 max-w-3xl">
        <BrutFil entityData={podcast} entityType="ARTICLE" />
      </div>
    </article>
  );
}

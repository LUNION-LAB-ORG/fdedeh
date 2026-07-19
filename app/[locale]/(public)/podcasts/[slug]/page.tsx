import React, { cache } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Headphones } from "lucide-react";
import { obtenirUnArticleAction } from "@/features/articles/actions/article.action";
import { dateFormat } from "@/utils/date-format";
import { addDomainToBackendImagePath } from "@/utils/image-utils";
import { StatsTracker } from "@/components/brut/stats-tracker";
import { BrutLikeButton } from "@/components/brut/brut-like-button";
import { BrutStats } from "@/components/brut/brut-stats";
import { BrutPodcastPlayer } from "@/components/brut/brut-podcast-player";
import { podcastLisible } from "@/utils/podcast";
import { BrutFil } from "@/components/brut/brut-fil";
import { BrutDetailAd } from "@/components/brut/brut-detail-ad";
import { absUrl, excerpt } from "@/lib/seo/content";
import { JsonLd, newsArticleLd } from "@/components/seo/json-ld";

type Props = { params: Promise<{ slug: string }> };

// Rendu frais : l'audio/contenu ajouté par l'admin apparaît sans attendre le cache.
export const dynamic = "force-dynamic";

const getPodcast = cache(async (slug: string) =>
  obtenirUnArticleAction(slug)
    .then((res) => res.data)
    .catch(() => null)
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const podcast = await getPodcast(slug);
  if (!podcast) return {};

  const url = absUrl(`/podcasts/${slug}`);
  const description = excerpt(podcast.content) || "Un podcast de Fernand Dédeh.";
  const image = podcast.path_resource ? addDomainToBackendImagePath(podcast.path_resource) : undefined;

  return {
    title: podcast.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: podcast.title,
      description,
      type: "article",
      url,
      images: image ? [image] : undefined,
      publishedTime: podcast.created_at,
      section: "Podcast",
    },
    twitter: { card: "summary_large_image", title: podcast.title, description, images: image ? [image] : undefined },
  };
}

export default async function PodcastDetailPage({ params }: Props) {
  const { slug } = await params;
  const podcast = await getPodcast(slug);

  if (!podcast) {
    notFound();
  }

  return (
    <article className="px-6 py-10 lg:px-11 lg:py-12">
      <JsonLd
        data={newsArticleLd({
          headline: podcast.title,
          description: excerpt(podcast.content),
          url: absUrl(`/podcasts/${slug}`),
          image: podcast.path_resource ? addDomainToBackendImagePath(podcast.path_resource) : undefined,
          datePublished: podcast.created_at,
          dateModified: podcast.updated_at,
          section: "Podcast",
        })}
      />
      <StatsTracker type="ARTICLE" id={podcast.id} />
      <div className="mx-auto max-w-3xl">
        <nav aria-label="Fil d'Ariane" className="mb-6 flex items-center gap-2.5 text-[13.5px] font-semibold">
          <Link href="/podcasts" className="text-brut-ink transition-colors hover:text-brut-signal">
            Podcasts
          </Link>
        </nav>

        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-brut-signal">
          <Headphones className="h-4 w-4" /> Podcast
        </span>
        <h1 className="mt-2 font-display text-[clamp(28px,4.4vw,50px)] font-black leading-[1.04] -tracking-[0.035em] text-balance">
          {podcast.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-brut-muted">
          <span>{dateFormat(podcast.created_at)}</span>
          <BrutStats views={podcast.view_count} comments={podcast.comments_count} />
          <BrutLikeButton likeableType="ARTICLE" likeableId={podcast.id} initialCount={podcast.likes_count ?? 0} />
        </div>

        {podcastLisible(podcast) ? (
          <BrutPodcastPlayer podcast={podcast} eyebrow="fd.info · Podcast" className="mt-6" />
        ) : (
          <p className="mt-6 rounded-xl border border-brut-line bg-brut-raise px-4 py-3 text-[13.5px] text-brut-muted">
            Le média de ce podcast n&apos;est pas encore disponible.
          </p>
        )}
      </div>

      {podcast.content && (
        <div className="mx-auto mt-10 max-w-3xl">
          <div className="brut-article-body" dangerouslySetInnerHTML={{ __html: podcast.content }} />
        </div>
      )}

      <div className="mx-auto max-w-3xl">
        <BrutDetailAd />
      </div>

      <div className="mx-auto mt-12 max-w-3xl">
        <BrutFil entityData={podcast} entityType="ARTICLE" />
      </div>
    </article>
  );
}

"use client";

import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import SocialShare from "@/features/articles/components/social-share";
import SimilarArticle from "@/features/articles/components/article/similar-article";
import { useArticleDetailsQuery } from "@/features/articles/queries/article-detail.query";
import { BrutFil } from "@/components/brut/brut-fil";
import { BrutLikeButton } from "@/components/brut/brut-like-button";
import { BrutStats } from "@/components/brut/brut-stats";
import { useStats } from "@/hooks/use-stats";
import { BrutAside } from "@/components/brut/brut-aside";
import { BrutContentImage } from "@/components/brut/brut-content-image";
import { dateFormat } from "@/utils/date-format";

function ArticleDetails({ slug }: { slug: string }) {
  const { data: article, isLoading } = useArticleDetailsQuery(slug);

  useStats({ type: "article", id: article?.id });

  if (!article && !isLoading) {
    return notFound();
  }

  if (isLoading || !article) {
    return (
      <div className="px-6 py-12 lg:px-11">
        <div className="mx-auto max-w-3xl animate-pulse space-y-5">
          <div className="h-5 w-40 rounded bg-brut-raise" />
          <div className="h-12 w-full rounded bg-brut-raise" />
          <div className="h-12 w-2/3 rounded bg-brut-raise" />
          <div className="aspect-[16/9] w-full rounded-2xl bg-brut-raise" />
        </div>
      </div>
    );
  }

  return (
    <article className="px-6 py-10 lg:px-11 lg:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <nav aria-label="Fil d'Ariane" className="mb-6 flex items-center gap-2.5 text-[13.5px] font-semibold">
            <Link href="/" className="text-brut-ink transition-colors hover:text-brut-signal">
              À la Une
            </Link>
            {article.category?.name && (
              <>
                <span className="text-brut-muted" aria-hidden>›</span>
                <span className="text-brut-muted">{article.category.name}</span>
              </>
            )}
          </nav>

          <h1 className="font-display text-[clamp(30px,4.6vw,52px)] font-black leading-[1.02] -tracking-[0.035em] text-balance">
            {article.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-brut-muted">
            {article.category?.name && <span className="font-semibold text-brut-ink">{article.category.name}</span>}
            <span>{dateFormat(article.created_at)}</span>
            <BrutStats views={article.view_count} comments={article.comments_count} />
            <BrutLikeButton likeableType="ARTICLE" likeableId={article.id} initialCount={article.likes_count ?? 0} />
          </div>
        </div>

        <figure className="mt-8">
          <BrutContentImage
            path={article.path_resource}
            alt={article.title}
            priority
            className="w-full"
            sizes="(max-width: 1024px) 100vw, 1000px"
          />
        </figure>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0">
            <div className="brut-article-body" dangerouslySetInnerHTML={{ __html: article.content }} />
            <div className="mt-8">
              <SocialShare />
            </div>
          </div>

          <div className="lg:sticky lg:top-6 lg:self-start">
            <BrutAside />
          </div>
        </div>

        <div className="mt-12 max-w-3xl">
          <BrutFil entityData={article} entityType="ARTICLE" />
        </div>

        <div className="mt-16 border-t border-brut-line pt-10">
          <h2 className="mb-6 font-display text-[clamp(22px,3vw,28px)] font-black -tracking-[0.03em]">À suivre aussi</h2>
          <SimilarArticle />
        </div>
      </div>
    </article>
  );
}

export default ArticleDetails;

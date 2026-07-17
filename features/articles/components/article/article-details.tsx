"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import SocialShare from "@/features/articles/components/social-share";
import SimilarArticle from "@/features/articles/components/article/similar-article";
import { useArticleDetailsQuery } from "@/features/articles/queries/article-detail.query";
import AvisForm from "@/features/commentaire/components/avis-form";
import AvisList from "@/features/commentaire/components/avis-list";
import { useStats } from "@/hooks/use-stats";
import { addDomainToBackendImagePath } from "@/utils/image-utils";
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
      <div className="mx-auto max-w-3xl">
        <nav aria-label="Fil d'Ariane" className="mb-6 flex items-center gap-2.5 text-[13.5px] font-semibold">
          <Link href="/a-la-une" className="text-brut-ink transition-colors hover:text-brut-signal">
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
        </div>
      </div>

      <figure className="mx-auto mt-8 max-w-4xl">
        <Image
          src={addDomainToBackendImagePath(article.path_resource)}
          alt={article.title}
          width={1200}
          height={700}
          priority
          className="max-h-[520px] w-full rounded-2xl border border-brut-line object-cover"
        />
      </figure>

      <div className="mx-auto mt-10 max-w-3xl">
        <div className="brut-article-body" dangerouslySetInnerHTML={{ __html: article.content }} />

        <div className="mt-8">
          <SocialShare />
        </div>

        <div className="mt-10">
          <AvisForm data={article} />
        </div>

        <div className="mt-12">
          <AvisList entityId={article.id.toLocaleString()} entityType="article" />
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-5xl border-t border-brut-line pt-10">
        <h2 className="mb-6 font-display text-[clamp(22px,3vw,28px)] font-black -tracking-[0.03em]">À suivre aussi</h2>
        <SimilarArticle />
      </div>
    </article>
  );
}

export default ArticleDetails;

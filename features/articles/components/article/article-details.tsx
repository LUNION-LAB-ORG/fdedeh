"use client";

import Publicite from "@/components/publicite";
import SectionTitle from "@/components/section-title";
import SimilarArticle from "@/features/articles/components/article/similar-article";
import SocialShare from "@/features/articles/components/social-share";
import { useArticleDetailsQuery } from "@/features/articles/queries/article-detail.query";
import AvisForm from "@/features/commentaire/components/avis-form";
import AvisList from "@/features/commentaire/components/avis-list";
import { addDomainToBackendImagePath } from "@/utils/image-utils";
import { sendGAEvent } from "@next/third-parties/google";
import Image from "next/image";

function ArticleDetails({ slug }: { slug: string }) {

  // const {getArticleBySlug} = useArticleStore()
  // const article = getArticleBySlug(slug);

  const { data: article, isPending, isLoading, isError, error } = useArticleDetailsQuery(slug);

  const isArticleLoading = isPending || isLoading;

  if (!article && !isArticleLoading) {
    return <div>Article non trouvé.</div>;
  }

  sendGAEvent(
    'page_view',
    'article_view',
    {
      article_id: article?.id,
      article_title: article?.title,
      article_slug: slug,
    }
  )

  return (
    <article className="page-container">
      <figure className="relative mt-6">
        {!isArticleLoading ? (
          article && <>
            <Image
              src={addDomainToBackendImagePath(article?.path_resource)}
              alt={article?.title || 'Article Image'}
              width={1200}
              height={600}
              className="w-full max-h-[500px] object-cover object-center rounded-xl"
            />
            <div
              className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent px-3 lg:px-6 pb-3 md:pb-5 lg:pb-10 rounded-b-xl"
            >
              <h1 className="text-white text-sm sm:text-lg md:text-xl lg:text-3xl font-bold transition duration-200">
                {article.title}
              </h1>
            </div>
          </>
        ) : (
          <div className="w-full h-80 bg-gray-300 animate-pulse rounded-xl"></div>
        )}
      </figure>
      <section className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr,minmax(100px,25%)] grid-rows-2 gap-16">
        <div className="prose max-w-none row-span-2">
          {!isArticleLoading ? (
            article && <>
              <div className="text-justify text-sm md:text-base"
                dangerouslySetInnerHTML={{ __html: article.content }}>
              </div>
              <SocialShare />
              <div className="mt-5 ">
                <AvisForm
                  data={article}
                />
              </div>
              <div className="mt-10">
                <AvisList
                  entityId={article.id.toLocaleString()}
                  entityType="article"
                />
              </div>
              <div className="mt-14">
                <div>
                  <SectionTitle
                    text="A suivre aussi"
                    className="w-2/3"
                  />
                  <SimilarArticle />
                </div>
              </div>
            </>
          ) : (
            <>
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="w-full h-6 bg-gray-300 animate-pulse rounded mb-2"></div>
              ))}
              <div className="w-20 h-6 bg-gray-300 animate-pulse rounded mt-5 mb-2"></div>
            </>
          )}
        </div>
        <Publicite bannerPosition="SIDEBAR_RIGHT" />
      </section>
    </article>
  );
}

export default ArticleDetails;
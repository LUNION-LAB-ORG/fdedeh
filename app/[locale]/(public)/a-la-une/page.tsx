import React from "react";
import { Metadata } from "next";
import { BrutPageHeader } from "@/components/brut/brut-page-header";
import { BrutArticleCard } from "@/components/brut/brut-article-card";
import { obtenirTousArticlesAction } from "@/features/articles/actions/article.action";

export const metadata: Metadata = {
  title: "À la une",
  description: "Tous les articles de la rédaction de fd.info.",
};

export default async function ALaUnePage() {
  const res = await obtenirTousArticlesAction({});
  const articles = res.data?.data ?? [];

  return (
    <>
      <BrutPageHeader
        eyebrow="La rédaction"
        title="À la une"
        subtitle="Tous les articles de la rédaction, pour suivre toute l'actualité ivoirienne."
      />
      <div className="px-6 py-12 lg:px-11">
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <BrutArticleCard article={article} key={`article-${article.id}`} />
            ))}
          </div>
        ) : (
          <p className="text-brut-muted">Aucun article pour le moment.</p>
        )}
      </div>
    </>
  );
}

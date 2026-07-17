import React from "react";
import { Metadata } from "next";
import { BrutPageHeader } from "@/components/brut/brut-page-header";
import { BrutArticleCard } from "@/components/brut/brut-article-card";
import { slugify } from "@/features/articles/utils/slugify";
import { obtenirTousArticlesAction } from "@/features/articles/actions/article.action";

export const metadata: Metadata = {
  title: "Sport",
  description: "Toute l'actualité sportive sur fd.info.",
};

export default async function SportsPage() {
  const res = await obtenirTousArticlesAction({});
  const articles = (res.data?.data ?? []).filter((a) => slugify(a.category?.name ?? "") === "sport");

  return (
    <>
      <BrutPageHeader eyebrow="Rubrique" title="Sport" subtitle="Toute l'actualité sportive, vue par Fernand Dédeh." />
      <div className="px-6 py-12 lg:px-11">
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <BrutArticleCard article={article} key={`article-${article.id}`} />
            ))}
          </div>
        ) : (
          <p className="text-brut-muted">Aucun article de sport pour le moment.</p>
        )}
      </div>
    </>
  );
}

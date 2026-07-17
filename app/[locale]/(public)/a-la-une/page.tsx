import React from "react";
import { Metadata } from "next";
import { BrutPageHeader } from "@/components/brut/brut-page-header";
import { BrutFeatureCard } from "@/components/brut/brut-feature-card";
import { BrutArticleCard } from "@/components/brut/brut-article-card";
import { BrutFilterPills, FilterPill } from "@/components/brut/brut-filter-pills";
import { slugify } from "@/features/articles/utils/slugify";
import { obtenirTousArticlesAction } from "@/features/articles/actions/article.action";

export const metadata: Metadata = {
  title: "À la une",
  description: "Tous les articles de la rédaction de fd.info.",
};

export default async function ALaUnePage() {
  const res = await obtenirTousArticlesAction({});
  const articles = res.data?.data ?? [];

  const vedette = articles[0];
  const reste = articles.slice(1);

  // Pills de rubrique : les catégories effectivement présentes.
  const vues = new Set<string>();
  const pills: FilterPill[] = [{ name: "Tout", href: "/a-la-une", active: true }];
  for (const a of articles) {
    const nom = a.category?.name;
    if (nom && !vues.has(nom)) {
      vues.add(nom);
      pills.push({ name: nom, href: `/actualites-nationales/${slugify(nom)}` });
    }
  }

  return (
    <>
      <BrutPageHeader
        eyebrow="La rédaction"
        title="À la une"
        subtitle="Tous les articles de la rédaction, pour suivre toute l'actualité ivoirienne."
      />
      <div className="px-6 py-12 lg:px-11">
        {articles.length > 0 ? (
          <>
            {pills.length > 1 && <BrutFilterPills pills={pills} />}

            {vedette && (
              <div className="mt-8">
                <BrutFeatureCard article={vedette} />
              </div>
            )}

            {reste.length > 0 && (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {reste.map((article) => (
                  <BrutArticleCard article={article} key={`article-${article.id}`} />
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-brut-muted">Aucun article pour le moment.</p>
        )}
      </div>
    </>
  );
}

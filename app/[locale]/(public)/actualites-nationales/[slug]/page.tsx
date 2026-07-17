import React from "react";
import { Metadata } from "next";
import { BrutPageHeader } from "@/components/brut/brut-page-header";
import { BrutArticleCard } from "@/components/brut/brut-article-card";
import { slugify } from "@/features/articles/utils/slugify";
import { obtenirTousArticlesAction } from "@/features/articles/actions/article.action";

type Props = { params: Promise<{ slug: string }> };

// Nom lisible d'une catégorie à partir de son slug, quand aucun article ne permet
// de le retrouver (ex: "reflexions-haute-voix" -> "Reflexions haute voix").
function titreDepuisSlug(slug: string) {
  const t = slug.replace(/-/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const res = await obtenirTousArticlesAction({});
  const nom = (res.data?.data ?? []).find((a) => slugify(a.category?.name ?? "") === slug)?.category?.name;
  return { title: nom ?? titreDepuisSlug(slug) };
}

export default async function CategoriePage({ params }: Props) {
  const { slug } = await params;
  const res = await obtenirTousArticlesAction({});
  const articles = (res.data?.data ?? []).filter((a) => slugify(a.category?.name ?? "") === slug);
  const nomCategorie = articles[0]?.category?.name ?? titreDepuisSlug(slug);

  return (
    <>
      <BrutPageHeader eyebrow="Actualités nationales" title={nomCategorie} />
      <div className="px-6 py-12 lg:px-11">
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <BrutArticleCard article={article} key={`article-${article.id}`} />
            ))}
          </div>
        ) : (
          <p className="text-brut-muted">Aucun article dans cette rubrique pour le moment.</p>
        )}
      </div>
    </>
  );
}

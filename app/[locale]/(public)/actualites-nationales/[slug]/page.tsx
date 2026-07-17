import React from "react";
import { Metadata } from "next";
import { BrutPageHeader } from "@/components/brut/brut-page-header";
import { BrutFeatureCard } from "@/components/brut/brut-feature-card";
import { BrutArticleCard } from "@/components/brut/brut-article-card";
import { BrutFilterPills, FilterPill } from "@/components/brut/brut-filter-pills";
import { BrutSeoBlock } from "@/components/brut/brut-seo-block";
import { slugify } from "@/features/articles/utils/slugify";
import { obtenirTousArticlesAction } from "@/features/articles/actions/article.action";

type Props = { params: Promise<{ slug: string }> };

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
  const tous = res.data?.data ?? [];
  const articles = tous.filter((a) => slugify(a.category?.name ?? "") === slug);
  const nomCategorie = articles[0]?.category?.name ?? titreDepuisSlug(slug);

  const vedette = articles[0];
  const reste = articles.slice(1);

  // Pills de navigation entre rubriques (toutes les catégories présentes).
  const vues = new Set<string>();
  const pills: FilterPill[] = [{ name: "Tout", href: "/a-la-une" }];
  for (const a of tous) {
    const nom = a.category?.name;
    if (nom && !vues.has(nom)) {
      vues.add(nom);
      pills.push({ name: nom, href: `/actualites-nationales/${slugify(nom)}`, active: slugify(nom) === slug });
    }
  }

  return (
    <>
      <BrutPageHeader eyebrow="Actualités nationales" title={nomCategorie} />
      <div className="px-6 py-12 lg:px-11">
        <BrutFilterPills pills={pills} />

        {articles.length > 0 ? (
          <>
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
          <p className="mt-8 text-brut-muted">Aucun article dans cette rubrique pour le moment.</p>
        )}

        <BrutSeoBlock
          title={nomCategorie}
          description={`Retrouvez sur fd.info toute l'actualité « ${nomCategorie} » en Côte d'Ivoire : analyses, décryptages et prises de position, suivis jour après jour par Fernand Dédeh et sa rédaction.`}
        />
      </div>
    </>
  );
}

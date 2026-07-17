import React from "react";
import { Link } from "@/i18n/navigation";
import FlashInfo from "@/components/flash-info";
import { BrutHero } from "@/components/brut/brut-hero";
import { BrutArticleCard } from "@/components/brut/brut-article-card";
import { BrutDailyCard } from "@/components/brut/brut-daily-card";
import { BrutAd } from "@/components/brut/brut-ad";
import { BrutQuestion } from "@/components/brut/brut-question";
import { BrutNewsletter } from "@/components/brut/brut-newsletter";
import { IArticle } from "@/features/articles/types/article.type";
import { slugify } from "@/features/articles/utils/slugify";
import { dateFormat } from "@/utils/date-format";
import { obtenirTousArticlesAction } from "@/features/articles/actions/article.action";
import { obtenirTousDailiesAction } from "@/features/dailies/dailies.action";

function dateISO(value: string) {
  return new Date(value).toISOString().split("T")[0];
}

function SectionHead({
  eyebrow,
  title,
  href,
  hrefLabel,
}: {
  eyebrow: string;
  title: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.15em] text-brut-signal">{eyebrow}</p>
        <h2 className="font-display text-[clamp(24px,3.6vw,34px)] font-black -tracking-[0.03em]">{title}</h2>
      </div>
      {href && (
        <Link
          href={href}
          className="shrink-0 font-mono text-[12px] uppercase tracking-[0.08em] text-brut-muted transition-colors hover:text-brut-signal"
        >
          {hrefLabel} →
        </Link>
      )}
    </div>
  );
}

export default async function HomePage() {
  const [articlesRes, dailiesRes] = await Promise.all([
    obtenirTousArticlesAction({}),
    obtenirTousDailiesAction({ page: 1 }),
  ]);

  const articles = articlesRes.data?.data ?? [];
  const dailies = dailiesRes.data?.data ?? [];

  const dailyUne = dailies[0];
  const dailiesListe = dailies.slice(1, 7);

  // Articles regroupés par catégorie (dans l'ordre d'apparition = du plus récent).
  const parCategorie = new Map<string, IArticle[]>();
  for (const article of articles) {
    const cat = article.category?.name ?? "Divers";
    const arr = parCategorie.get(cat) ?? [];
    arr.push(article);
    parCategorie.set(cat, arr);
  }
  const categories = [...parCategorie.entries()];

  return (
    <>
      <FlashInfo />

      {dailyUne && (
        <BrutHero
          imagePath={dailyUne.contents?.[0]?.path_image}
          eyebrow={`Le Daily du jour · ${dateFormat(dailyUne.published_at)}`}
          badges={
            Array.from(
              new Set((dailyUne.contents ?? []).map((c) => c.hashtag?.hashtag).filter(Boolean))
            ).slice(0, 4) as string[]
          }
          title={dailyUne.introduction}
          metas={[`${dailyUne.view_count ?? 0} vues`, `${(dailyUne.contents ?? []).length} sujets`]}
          href={`/dailies/${dateISO(dailyUne.published_at)}`}
          ctaLabel="Lire le Daily"
        />
      )}

      <div className="px-6 pb-4 lg:px-11">
        {dailiesListe.length > 0 && (
          <section className="pt-12">
            <SectionHead eyebrow="Le Daily" title="À la une" href="/dailies" hrefLabel="Toutes les archives" />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <BrutDailyCard daily={dailiesListe[0]} featured />
              </div>
              {dailiesListe.slice(1, 5).map((daily) => (
                <BrutDailyCard daily={daily} key={`daily-${daily.id}`} />
              ))}
            </div>
          </section>
        )}

        <BrutAd position="HEADER" />

        <BrutQuestion />

        {categories.length > 0 && (
          <section className="pt-16">
            <SectionHead eyebrow="Le fil" title="Autres actualités" href="/a-la-une" hrefLabel="Tout voir" />
            <div className="flex flex-col gap-12">
              {categories.map(([categorie, liste]) => (
                <div key={categorie}>
                  <h3 className="mb-5 flex items-center gap-4 font-display text-[19px] font-black -tracking-[0.02em]">
                    <span className="shrink-0">{categorie}</span>
                    <span className="h-px flex-1 bg-brut-line" />
                    <Link
                      href={`/actualites-nationales/${slugify(categorie)}`}
                      className="shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] text-brut-muted transition-colors hover:text-brut-signal"
                    >
                      Voir →
                    </Link>
                  </h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {liste.slice(0, 3).map((article) => (
                      <BrutArticleCard article={article} key={`article-${article.id}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <BrutNewsletter />
      </div>
    </>
  );
}

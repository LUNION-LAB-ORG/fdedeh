import React from "react";
import { Link } from "@/i18n/navigation";
import FlashInfo from "@/components/flash-info";
import { BrutHero } from "@/components/brut/brut-hero";
import { BrutArticleCard } from "@/components/brut/brut-article-card";
import { BrutDailyCard } from "@/components/brut/brut-daily-card";
import { BrutAd } from "@/components/brut/brut-ad";
import { BrutQuestion } from "@/components/brut/brut-question";
import { BrutNewsletter } from "@/components/brut/brut-newsletter";
import { BrutDatePicker } from "@/components/brut/brut-date-picker";
import { IArticle } from "@/features/articles/types/article.type";
import { slugify } from "@/features/articles/utils/slugify";
import { dateFormat } from "@/utils/date-format";
import { obtenirTousArticlesAction } from "@/features/articles/actions/article.action";
import { obtenirTousDailiesAction } from "@/features/dailies/dailies.action";
import { obtenirListePpefAction } from "@/features/ppef/ppef.action";
import { PpefFeedCard } from "@/components/brut/ppef-feed-card";

function dateISO(value: string) {
  return new Date(value).toISOString().split("T")[0];
}

function SectionHead({
  eyebrow,
  title,
  href,
  hrefLabel,
}: {
  eyebrow?: string;
  title: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.15em] text-brut-signal">{eyebrow}</p>}
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
  const [articlesRes, dailiesRes, ppefRes] = await Promise.all([
    obtenirTousArticlesAction({}),
    obtenirTousDailiesAction({ page: 1 }),
    obtenirListePpefAction(),
  ]);

  const articles = articlesRes.data?.data ?? [];
  const dailies = dailiesRes.data?.data ?? [];
  const dernierPpef = (ppefRes.success ? ppefRes.data?.data ?? [] : [])[0];

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
          eyebrow={`A Barthelemy Inabo · ${dateFormat(dailyUne.published_at)}`}
          badges={
            Array.from(
              new Set((dailyUne.contents ?? []).map((c) => c.hashtag?.hashtag).filter(Boolean))
            ).slice(0, 4) as string[]
          }
          title={dailyUne.introduction}
          metas={[`${dailyUne.view_count ?? 0} vues`, `${(dailyUne.contents ?? []).length} sujets`]}
          href={`/dailies/${dateISO(dailyUne.published_at)}`}
          ctaLabel="Lire A Barthelemy Inabo"
          extra={<BrutDatePicker selected={dateISO(dailyUne.published_at)} label="Un autre jour" />}
        />
      )}

      <div className="px-6 pb-4 lg:px-11">
        {dailiesListe.length > 0 && (
          <section className="pt-12">
            <SectionHead eyebrow="A Barthelemy Inabo" title="À la une" href="/dailies" hrefLabel="Toutes les archives" />
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

        {dernierPpef && (
          <section className="pt-16">
            <SectionHead
              eyebrow="Pôle Pénal Économique et Financier"
              title="La dernière audience PPEF"
              href="/ppef"
              hrefLabel="Toutes les audiences"
            />
            <div className="max-w-[600px]">
              <PpefFeedCard publication={dernierPpef} />
            </div>
          </section>
        )}

        <BrutAd position="HEADER" />

        <BrutQuestion />

        {categories.length > 0 && (
          <section className="pt-16">
            <SectionHead title="Autres actualités" href="/a-la-une" hrefLabel="Tout voir" />
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

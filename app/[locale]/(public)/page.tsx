import React from "react";
import { Link } from "@/i18n/navigation";
import { BrutHero } from "@/components/brut/brut-hero";
import { BrutArticleCard } from "@/components/brut/brut-article-card";
import { BrutDailyCard } from "@/components/brut/brut-daily-card";
import { obtenirTousArticlesAction } from "@/features/articles/actions/article.action";
import { obtenirTousDailiesAction } from "@/features/dailies/dailies.action";

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
    obtenirTousArticlesAction({ page: 1 }),
    obtenirTousDailiesAction({ page: 1 }),
  ]);

  const articles = articlesRes.data?.data ?? [];
  const dailies = dailiesRes.data?.data ?? [];

  const une = articles[0];
  const grilleArticles = articles.slice(1, 7);
  const derniersDailies = dailies.slice(0, 3);

  return (
    <>
      {une && <BrutHero article={une} />}

      <div className="px-6 pb-4 lg:px-11">
        {derniersDailies.length > 0 && (
          <section className="pt-12">
            <SectionHead eyebrow="Chaque jour" title="Le Daily" href="/dailies" hrefLabel="Toutes les archives" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {derniersDailies.map((daily) => (
                <BrutDailyCard daily={daily} key={`daily-${daily.id}`} />
              ))}
            </div>
          </section>
        )}

        {grilleArticles.length > 0 && (
          <section className="pt-14">
            <SectionHead eyebrow="La rédaction" title="À la une" href="/a-la-une" hrefLabel="Tout voir" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {grilleArticles.map((article) => (
                <BrutArticleCard article={article} key={`article-${article.id}`} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

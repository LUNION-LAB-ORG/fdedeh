import React from "react";
import { Metadata } from "next";
import { BrutSidebar } from "@/components/brut/brut-sidebar";
import { BrutHero } from "@/components/brut/brut-hero";
import { BrutArticleCard } from "@/components/brut/brut-article-card";
import { BrutDailyCard } from "@/components/brut/brut-daily-card";
import { BrutBadge } from "@/components/brut/brut-badge";
import { obtenirTousArticlesAction } from "@/features/articles/actions/article.action";
import { obtenirTousDailiesAction } from "@/features/dailies/dailies.action";

export const metadata: Metadata = {
  title: "Design system — fd.info × Brut",
  robots: { index: false, follow: false },
};

export default async function DesignPreviewPage() {
  const [articlesRes, dailiesRes] = await Promise.all([
    obtenirTousArticlesAction({ page: 1 }),
    obtenirTousDailiesAction({ page: 1 }),
  ]);

  const articles = articlesRes.data?.data ?? [];
  const daily = dailiesRes.data?.data?.[0];
  const une = articles[0];
  const grille = articles.slice(1, 5);

  return (
    <div className="flex items-start bg-brut-ground text-brut-ink">
      <BrutSidebar />

      <main className="min-w-0 flex-1 pb-16">
        {/* Hero — mise en page adaptée au ratio de l'image (mesuré côté client) */}
        {une && <BrutHero article={une} />}

        <div className="px-6 lg:px-11">
          {/* Cartes */}
          <section className="pt-[52px]">
            <p className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-brut-signal">Composants</p>
            <h2 className="mb-1 font-display text-[clamp(22px,3.4vw,30px)] font-black -tracking-[0.03em]">Les cartes</h2>
            <p className="mb-6 max-w-[60ch] text-[15px] text-brut-muted">
              La carte Daily met le texte en scène sur fond sombre avec ses rubriques ; les cartes Article gardent la
              photo, la catégorie en pastille, le titre gras dessous.
            </p>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {daily && (
                <div className="sm:col-span-2 lg:col-span-1 lg:row-span-1">
                  <BrutDailyCard daily={daily} />
                </div>
              )}
              {grille.map((article) => (
                <BrutArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>

          {/* Badges & boutons */}
          <section className="pt-14">
            <p className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-brut-signal">Composants</p>
            <h2 className="mb-1 font-display text-[clamp(22px,3.4vw,30px)] font-black -tracking-[0.03em]">Badges &amp; boutons</h2>
            <p className="mb-6 max-w-[60ch] text-[15px] text-brut-muted">
              Orange plein pour la mise en avant ; contour encre pour les types de contenu ; sourdine pour le secondaire.
            </p>

            <div className="mb-5 flex flex-wrap items-center gap-3">
              <BrutBadge variant="signal" dot>À la une</BrutBadge>
              <BrutBadge variant="signal">Le Daily</BrutBadge>
              <BrutBadge variant="outline">Article</BrutBadge>
              <BrutBadge variant="outline">Podcast</BrutBadge>
              <BrutBadge variant="soft">Réflexions</BrutBadge>
              <BrutBadge variant="soft">Question du jour</BrutBadge>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-brut-ink px-5 py-[11px] text-[14px] font-bold text-brut-ground">
                Lire l&apos;article →
              </button>
              <button className="inline-flex items-center gap-2 rounded-full bg-custom-gradient px-5 py-[11px] text-[14px] font-bold text-[#1A0F00]">
                Voir le Daily →
              </button>
              <button className="rounded-full border-[1.5px] border-brut-ink px-[19px] py-[10px] text-[14px] font-bold text-brut-ink">
                Tout voir
              </button>
            </div>
          </section>

          <p className="mt-14 max-w-[68ch] border-t-[3px] border-brut-ink pt-6 text-[15.5px] leading-relaxed text-brut-muted">
            <b className="font-bold text-brut-ink">Phase 1 — composants réels.</b> Sidebar, cartes et badges rendus avec
            les données live de fdedeh, sur le système de tokens existant. Bascule le thème clair/sombre pour voir les
            deux.
          </p>
        </div>
      </main>
    </div>
  );
}

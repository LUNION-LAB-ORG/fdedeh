import React from "react";
import { Metadata } from "next";
import { BrutPageHeader } from "@/components/brut/brut-page-header";
import { BrutPodcastCard } from "@/components/brut/brut-podcast-card";
import { obtenirTousArticlesAction } from "@/features/articles/actions/article.action";

export const metadata: Metadata = {
  title: "Podcasts",
  description: "Les émissions et interviews audio de fd.info, à écouter.",
};

export default async function PodcastsPage() {
  const res = await obtenirTousArticlesAction({ type: "PODCAST" });
  const podcasts = res.data?.data ?? [];

  return (
    <>
      <BrutPageHeader
        eyebrow="Le média"
        title="Podcasts"
        subtitle="Nos émissions et interviews à écouter, où que vous soyez."
      />
      <div className="px-6 py-12 lg:px-11">
        {podcasts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {podcasts.map((podcast) => (
              <BrutPodcastCard podcast={podcast} key={`podcast-${podcast.id}`} />
            ))}
          </div>
        ) : (
          <p className="text-brut-muted">Aucun podcast pour le moment. Revenez bientôt.</p>
        )}
      </div>
    </>
  );
}

import React from "react";
import { Metadata } from "next";
import { Mic } from "lucide-react";
import { BrutPodcastCard } from "@/components/brut/brut-podcast-card";
import { BrutPodcastPlayer } from "@/components/brut/brut-podcast-player";
import { obtenirTousArticlesAction } from "@/features/articles/actions/article.action";

export const metadata: Metadata = {
  title: "Podcasts",
  description: "Les émissions et interviews audio de fd.info, à écouter partout.",
};

// Contenu qui change (ajout d'audio par l'admin) : toujours rendu frais.
export const dynamic = "force-dynamic";

export default async function PodcastsPage() {
  const res = await obtenirTousArticlesAction({ type: "PODCAST" });
  const podcasts = res.data?.data ?? [];
  const featured = podcasts.find((p) => p.path_audio);

  return (
    <div className="px-6 py-10 lg:px-11 lg:py-12">
      <div className="mb-9 flex items-start gap-3.5">
        <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brut-raise text-brut-signal">
          <Mic className="h-[22px] w-[22px]" />
        </span>
        <div>
          <h1 className="font-display text-[clamp(30px,5vw,52px)] font-black -tracking-[0.04em]">Les podcasts de fd.info</h1>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-brut-muted">
            Plongez dans l&apos;actualité, retrouvez nos interviews de personnalités et nos émissions exclusives. À écouter, où que vous soyez.
          </p>
        </div>
      </div>

      {featured && (
        <div className="mb-12">
          <BrutPodcastPlayer
            src={featured.path_audio!}
            coverRaw={featured.path_resource}
            title={featured.title}
            eyebrow="Le dernier podcast"
          />
        </div>
      )}

      <h2 className="mb-6 font-display text-[clamp(20px,3vw,28px)] font-black -tracking-[0.03em]">Tous les podcasts</h2>
      {podcasts.length > 0 ? (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {podcasts.map((podcast) => (
            <BrutPodcastCard podcast={podcast} key={`podcast-${podcast.id}`} />
          ))}
        </div>
      ) : (
        <p className="text-brut-muted">Aucun podcast pour le moment. Revenez bientôt.</p>
      )}
    </div>
  );
}

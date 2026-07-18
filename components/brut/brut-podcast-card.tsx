import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { IArticle } from "@/features/articles/types/article.type";
import { couverturePodcast } from "@/utils/podcast";

// Carte podcast façon maquette : uniquement la grande pochette carrée (le texte
// est dans la pochette). Titre repris en alt/aria pour l'accessibilité.
export function BrutPodcastCard({ podcast }: { podcast: IArticle }) {
  const cover = couverturePodcast(podcast.path_resource);

  return (
    <Link
      href={`/podcasts/${podcast.slug}`}
      aria-label={podcast.title}
      className="group relative block aspect-square overflow-hidden rounded-2xl border border-brut-line bg-brut-raise"
    >
      <Image
        src={cover}
        alt={podcast.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 380px"
      />
    </Link>
  );
}

export default BrutPodcastCard;

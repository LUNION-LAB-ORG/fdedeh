import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { IArticle } from "@/features/articles/types/article.type";
import { couverturePodcast, podcastLisible } from "@/utils/podcast";

// Carte podcast façon maquette : la grande pochette carrée (le texte est dans la
// pochette). Titre repris en alt/aria pour l'accessibilité. Une pastille lecture
// signale que la carte est un média jouable (audio ou vidéo).
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
      {podcastLisible(podcast) && (
        <span className="pointer-events-none absolute bottom-3 left-3 grid h-9 w-9 place-items-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
          <Play className="ml-0.5 h-4 w-4 fill-current" />
        </span>
      )}
    </Link>
  );
}

export default BrutPodcastCard;

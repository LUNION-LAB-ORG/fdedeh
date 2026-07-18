import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Headphones } from "lucide-react";
import { IArticle } from "@/features/articles/types/article.type";
import { youtubeThumbnail } from "@/utils/youtube";
import { addDomainToBackendImagePath } from "@/utils/image-utils";

function extraitTexte(html: string, max = 160) {
  const texte = (html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return texte.length > max ? texte.slice(0, max).trimEnd() + "…" : texte;
}

// Carte podcast façon maquette : grande pochette carrée + titre + description.
export function BrutPodcastCard({ podcast }: { podcast: IArticle }) {
  const cover = !podcast.path_resource
    ? "/images/default-image.png"
    : podcast.path_resource.includes("youtu")
    ? youtubeThumbnail(podcast.path_resource) ?? "/images/default-image.png"
    : addDomainToBackendImagePath(podcast.path_resource);

  return (
    <Link href={`/podcasts/${podcast.slug}`} className="group flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-brut-line bg-brut-raise">
        <Image
          src={cover}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, 380px"
        />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur">
          <Headphones className="h-3.5 w-3.5" /> Podcast
        </span>
      </div>
      <h3 className="mt-3 font-display text-[19px] font-black leading-[1.15] -tracking-[0.02em] text-brut-ink transition-colors group-hover:text-brut-signal">
        {podcast.title}
      </h3>
      {podcast.content && (
        <p className="mt-2 text-[14px] leading-relaxed text-brut-muted line-clamp-3">{extraitTexte(podcast.content)}</p>
      )}
    </Link>
  );
}

export default BrutPodcastCard;

import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { ArticleMedia, couvertureArticle, videoArticle } from "@/utils/article-media";

const IMAGE_PAR_DEFAUT = "/images/default-image.png";

// Vignette d'un article dans les listes : son image, ou — pour un article vidéo —
// son affiche, la miniature YouTube, à défaut la première image du fichier vidéo.
// Remplit son parent, qui doit être `relative overflow-hidden` ; l'effet de survol
// est passé par `className`.
export function BrutArticleThumb({
  article,
  className,
  sizes,
  pastille = "md",
}: {
  article: ArticleMedia;
  className?: string;
  sizes?: string;
  pastille?: "sm" | "md";
}) {
  const video = videoArticle(article);
  const couverture = couvertureArticle(article);
  // Vidéo uploadée sans affiche : seul cas où l'on montre le fichier lui-même.
  const fichierSansAffiche = !couverture && video?.kind === "file" ? video.src : null;

  return (
    <>
      {fichierSansAffiche ? (
        <>
          {/* Fond de repli : reste visible tant que le navigateur n'a décodé aucune
              image de la vidéo (format non lu, préchargement coupé). */}
          <Image src={IMAGE_PAR_DEFAUT} alt="" fill sizes={sizes} className={cn("object-cover", className)} />
          {/* Décor uniquement : on ne charge que les métadonnées, rien ne se lance et le
              clic reste au lien parent. `#t=0.1` fait afficher une image sur iOS. */}
          <video
            src={`${fichierSansAffiche}#t=0.1`}
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
            tabIndex={-1}
            aria-hidden
            className={cn("pointer-events-none absolute inset-0 h-full w-full object-cover", className)}
          />
        </>
      ) : (
        <Image
          src={couverture ?? IMAGE_PAR_DEFAUT}
          alt=""
          fill
          sizes={sizes}
          className={cn("object-cover", className)}
        />
      )}

      {video && (
        <span
          className={cn(
            "pointer-events-none absolute grid place-items-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110",
            pastille === "sm" ? "bottom-1.5 left-1.5 h-6 w-6" : "bottom-3 left-3 h-9 w-9"
          )}
        >
          <Play aria-hidden className={cn("fill-current", pastille === "sm" ? "ml-px h-2.5 w-2.5" : "ml-0.5 h-4 w-4")} />
          <span className="sr-only">Vidéo</span>
        </span>
      )}
    </>
  );
}

export default BrutArticleThumb;

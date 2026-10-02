import React from "react";
import { cn } from "@/lib/utils";
import { ArticleMedia, couvertureArticle, videoArticle } from "@/utils/article-media";

// Lecteur d'un article vidéo : intégration YouTube ou fichier servi par le backend.
// Ne rend rien si l'article n'a pas de vidéo lisible (l'appelant affiche l'image).
export function BrutArticleVideo({
  article,
  title,
  className,
}: {
  article: ArticleMedia;
  title: string;
  className?: string;
}) {
  const video = videoArticle(article);
  if (!video) return null;

  return (
    <div className={cn("relative aspect-video w-full overflow-hidden rounded-2xl bg-black", className)}>
      {video.kind === "youtube" ? (
        <iframe
          src={video.embed}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <VideoFichier src={video.src} affiche={couvertureArticle(article)} />
      )}
    </div>
  );
}

function VideoFichier({ src, affiche }: { src: string; affiche: string | null }) {
  return (
    <video
      // Sans affiche, `#t=0.1` fait apparaître une image de la vidéo au lieu d'un cadre noir.
      src={affiche ? src : `${src}#t=0.1`}
      poster={affiche ?? undefined}
      controls
      playsInline
      preload="metadata"
      className="absolute inset-0 h-full w-full"
    >
      Votre navigateur ne lit pas cette vidéo.
    </video>
  );
}

export default BrutArticleVideo;

import React from "react";
import { IDailyContent } from "@/features/dailies/types";
import { BrutContentImage } from "@/components/brut/brut-content-image";
import { cn } from "@/lib/utils";

// Une section de diffusion : son TITRE en en-tête, puis ses images, puis le contenu.
// - 1 image : mise en page journal (flottante gauche/droite ou pleine largeur selon la position).
// - plusieurs images : galerie en grille au-dessus du texte.
function DailyContent(props: { content: IDailyContent; index: number }) {
  const { content, index } = props;
  const titre = content.title || content.hashtag?.hashtag; // repli ancien modèle
  const images =
    content.images && content.images.length > 0
      ? content.images.map((i) => i.path_image)
      : content.path_image
      ? [content.path_image]
      : [];

  const layout = index % 3;
  const flottante = layout !== 1;
  const unique = images.length === 1;

  return (
    <section>
      {titre && (
        <h2 className="mb-4 flex items-center gap-3 font-display text-[21px] font-black -tracking-[0.02em] text-brut-ink">
          <span className="shrink-0">{titre}</span>
          <span className="h-px flex-1 bg-brut-line" />
        </h2>
      )}

      {images.length > 1 && (
        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {images.map((src, i) => (
            <BrutContentImage key={i} path={src} className="w-full" sizes="(max-width: 640px) 100vw, 360px" />
          ))}
        </div>
      )}

      {unique && !flottante && (
        <BrutContentImage path={images[0]} className="mb-5 w-full" sizes="(max-width: 768px) 100vw, 720px" />
      )}

      <div className="brut-article-body">
        {unique && flottante && (
          <BrutContentImage
            path={images[0]}
            className={cn(
              "mb-3 w-full sm:w-[42%]",
              layout === 0 ? "sm:float-left sm:mr-6" : "sm:float-right sm:ml-6"
            )}
            sizes="(max-width: 640px) 100vw, 320px"
          />
        )}
        <div dangerouslySetInnerHTML={{ __html: content.body }} />
        <div className="clear-both" />
      </div>
    </section>
  );
}

export default DailyContent;

import React from "react";
import Image from "next/image";
import { IDailyContent } from "@/features/dailies/types";
import { addDomainToBackendImagePath } from "@/utils/image-utils";
import { cn } from "@/lib/utils";

// Chaque contenu du daily a sa particularité : la mise en page de l'image
// alterne selon sa position (journal). 0 = image flottante à gauche,
// 1 = image pleine largeur en haut, 2 = image flottante à droite.
function DailyContent(props: { content: IDailyContent; index: number }) {
  const hashtag = props.content.hashtag?.hashtag;
  const image = props.content.path_image;
  const layout = props.index % 3;
  const flottante = layout !== 1;

  return (
    <section>
      {hashtag && (
        <h2 className="mb-4 flex items-center gap-3 font-display text-[21px] font-black -tracking-[0.02em] text-brut-ink">
          <span className="shrink-0">{hashtag}</span>
          <span className="h-px flex-1 bg-brut-line" />
        </h2>
      )}

      {image && !flottante && (
        <div className="relative mb-5 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-brut-line">
          <Image src={addDomainToBackendImagePath(image)} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
        </div>
      )}

      <div className="brut-article-body">
        {image && flottante && (
          <div
            className={cn(
              "relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-brut-line sm:w-[42%]",
              layout === 0 ? "sm:float-left sm:mr-6" : "sm:float-right sm:ml-6"
            )}
          >
            <Image src={addDomainToBackendImagePath(image)} alt="" fill className="object-cover" sizes="(max-width: 640px) 100vw, 320px" />
          </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: props.content.body }} />
        <div className="clear-both" />
      </div>
    </section>
  );
}

export default DailyContent;

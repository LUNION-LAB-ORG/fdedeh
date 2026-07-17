import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { IArticle } from "@/features/articles/types/article.type";
import { addDomainToBackendImagePath } from "@/utils/image-utils";
import { dateFormat } from "@/utils/date-format";
import { BrutBadge } from "./brut-badge";

// Carte « vedette » : un article mis en avant en grand, image et texte côte à côte.
// Reprend le traitement du hero de rubrique de la maquette.
export function BrutFeatureCard({ article }: { article: IArticle }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group grid overflow-hidden rounded-2xl border border-brut-line bg-brut-surface lg:grid-cols-2"
    >
      <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[340px]">
        <Image
          src={addDomainToBackendImagePath(article.path_resource)}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {article.category?.name && (
          <BrutBadge variant="signal" className="absolute left-4 top-4">
            {article.category.name}
          </BrutBadge>
        )}
      </div>
      <div className="flex flex-col justify-center gap-4 p-6 lg:p-10">
        <h3 className="font-display text-[clamp(22px,2.6vw,34px)] font-black leading-[1.06] -tracking-[0.03em] line-clamp-4">
          {article.title}
        </h3>
        <time className="font-mono text-[12px] text-brut-muted">{dateFormat(article.created_at)}</time>
      </div>
    </Link>
  );
}

export default BrutFeatureCard;

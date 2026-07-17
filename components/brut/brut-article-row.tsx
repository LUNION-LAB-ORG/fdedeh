import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { IArticle } from "@/features/articles/types/article.type";
import { addDomainToBackendImagePath } from "@/utils/image-utils";
import { dateFormat } from "@/utils/date-format";

// Carte horizontale compacte : vignette + rubrique + titre. Pour les listes
// secondaires (« À suivre aussi », colonnes latérales), façon maquette Brut.
export function BrutArticleRow({ article }: { article: IArticle }) {
  return (
    <Link href={`/articles/${article.slug}`} className="group flex items-center gap-4">
      <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-xl border border-brut-line sm:w-36">
        <Image
          src={addDomainToBackendImagePath(article.path_resource)}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0">
        {article.category?.name && (
          <div className="mb-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-brut-signal">
            {article.category.name}
          </div>
        )}
        <h4 className="line-clamp-2 text-[15px] font-extrabold leading-[1.25] -tracking-[0.01em] text-brut-ink transition-colors group-hover:text-brut-signal">
          {article.title}
        </h4>
        <time className="mt-1 block font-mono text-[11px] text-brut-muted">{dateFormat(article.created_at)}</time>
      </div>
    </Link>
  );
}

export default BrutArticleRow;

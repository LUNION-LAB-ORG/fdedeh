import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { IArticle } from "@/features/articles/types/article.type";
import { addDomainToBackendImagePath } from "@/utils/image-utils";
import { dateFormat } from "@/utils/date-format";
import { BrutBadge } from "./brut-badge";
import { BrutStats } from "./brut-stats";

export function BrutArticleCard({ article }: { article: IArticle }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-brut-line bg-brut-surface"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={addDomainToBackendImagePath(article.path_resource)}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {article.category?.name && (
          <BrutBadge variant="soft" className="absolute left-3 top-3 bg-brut-ground text-brut-ink">
            {article.category.name}
          </BrutBadge>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 px-4 pb-4 pt-[15px]">
        <h3 className="text-[16.5px] font-extrabold leading-[1.22] -tracking-[0.01em] text-brut-ink line-clamp-3">
          {article.title}
        </h3>
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1">
          <time className="font-mono text-[11.5px] text-brut-muted">{dateFormat(article.created_at)}</time>
          <BrutStats views={article.view_count} likes={article.likes_count} comments={article.comments_count} className="text-[11px]" />
        </div>
      </div>
    </Link>
  );
}

export default BrutArticleCard;

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Play } from "lucide-react";
import { IArticle } from "@/features/articles/types/article.type";
import { youtubeThumbnail } from "@/utils/youtube";
import { dateFormat } from "@/utils/date-format";
import { BrutStats } from "./brut-stats";

export function BrutPodcastCard({ podcast }: { podcast: IArticle }) {
  const thumb = youtubeThumbnail(podcast.path_resource) ?? "/images/default-image.png";

  return (
    <Link
      href={`/podcasts/${podcast.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-brut-line bg-brut-surface"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        <Image src={thumb} alt="" fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brut-signal text-[#1A0F00] shadow-lg transition-transform group-hover:scale-110">
            <Play className="ml-0.5 h-6 w-6 fill-current" />
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 px-4 pb-4 pt-[15px]">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-brut-signal">● Podcast</div>
        <h3 className="line-clamp-2 text-[16px] font-extrabold leading-[1.25] -tracking-[0.01em] text-brut-ink">
          {podcast.title}
        </h3>
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1">
          <time className="font-mono text-[11.5px] text-brut-muted">{dateFormat(podcast.created_at)}</time>
          <BrutStats views={podcast.view_count} likes={podcast.likes_count} comments={podcast.comments_count} className="text-[11px]" />
        </div>
      </div>
    </Link>
  );
}

export default BrutPodcastCard;

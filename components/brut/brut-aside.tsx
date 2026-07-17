"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Facebook, Twitter, Youtube } from "lucide-react";
import { useArticleStore } from "@/features/articles/stores/article.store";
import { addDomainToBackendImagePath } from "@/utils/image-utils";
import { dateFormat } from "@/utils/date-format";
import { cn } from "@/lib/utils";
import { BrutAd } from "./brut-ad";

const SOCIALS = [
  { name: "Facebook", href: "https://www.facebook.com/fernand.tagro", Icon: Facebook, bg: "bg-[#448AE9]" },
  { name: "Twitter", href: "https://x.com/FernandDdeh", Icon: Twitter, bg: "bg-[#1CA1F2]" },
  { name: "YouTube", href: "https://www.youtube.com/@fernanddedeh1580", Icon: Youtube, bg: "bg-[#F1563E]" },
];

export function BrutAside() {
  const { getFilteredArticles, allArticles } = useArticleStore();
  const derniers = allArticles.length ? getFilteredArticles({ limit: 5 }) : [];

  return (
    <aside className="flex flex-col gap-9">
      <section>
        <h3 className="mb-4 font-display text-[18px] font-black uppercase -tracking-[0.02em]">Restez connecté</h3>
        <div className="flex flex-col gap-3">
          {SOCIALS.map(({ name, href, Icon, bg }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-3 rounded-full px-5 py-3 text-[15px] font-bold text-white transition-transform hover:scale-[1.02]",
                bg
              )}
            >
              <Icon className="h-5 w-5" />
              {name}
            </a>
          ))}
        </div>
      </section>

      {derniers.length > 0 && (
        <section>
          <h3 className="mb-4 flex items-center gap-2.5 font-display text-[18px] font-black uppercase -tracking-[0.02em]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brut-signal opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brut-signal" />
            </span>
            À la une
          </h3>
          <div className="flex flex-col divide-y divide-brut-line">
            {derniers.map((article, i) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group flex gap-3 py-3 duration-500 animate-in fade-in slide-in-from-bottom-2 fill-mode-backwards"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className="relative aspect-square w-16 shrink-0 overflow-hidden rounded-lg border border-brut-line">
                  <Image
                    src={addDomainToBackendImagePath(article.path_resource)}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="line-clamp-2 text-[13.5px] font-bold leading-[1.25] text-brut-ink transition-colors group-hover:text-brut-signal">
                    {article.title}
                  </h4>
                  <time className="mt-1 block font-mono text-[10.5px] text-brut-muted">{dateFormat(article.created_at)}</time>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <BrutAd position="SIDEBAR_RIGHT" className="pt-0" />
    </aside>
  );
}

export default BrutAside;

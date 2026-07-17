import React from "react";
import { IDailyContent } from "@/features/dailies/types";

function DailyContent(props: { content: IDailyContent; index: number }) {
  const hashtag = props.content.hashtag?.hashtag;

  return (
    <section>
      {hashtag && (
        <h2 className="mb-3 flex items-center gap-3 font-display text-[20px] font-black -tracking-[0.02em] text-brut-ink">
          <span className="shrink-0">{hashtag}</span>
          <span className="h-px flex-1 bg-brut-line" />
        </h2>
      )}
      <div className="brut-article-body" dangerouslySetInnerHTML={{ __html: props.content.body }} />
    </section>
  );
}

export default DailyContent;

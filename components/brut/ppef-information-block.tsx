"use client";

import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { IPpefInformation } from "@/features/ppef/ppef.type";
import { BrutLikeButton } from "@/components/brut/brut-like-button";
import { BrutFil } from "@/components/brut/brut-fil";

// Une information PPEF : numéro + texte, puis ses interactions propres
// (like + commentaires), le fil se dépliant à la demande.
export function PpefInformationBlock({ info, index }: { info: IPpefInformation; index: number }) {
  const [ouvert, setOuvert] = useState(false);

  return (
    <section className="border-l-2 border-brut-line pl-5">
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brut-ink font-mono text-[12px] font-bold text-brut-ground">
          {index + 1}
        </span>
      </div>

      <p className="whitespace-pre-line text-[16px] leading-relaxed text-brut-ink-soft">{info.body}</p>

      <div className="mt-3 flex items-center gap-5">
        <BrutLikeButton likeableType="INFORMATION" likeableId={info.id} initialCount={info.likes_count} />
        <button
          type="button"
          onClick={() => setOuvert((v) => !v)}
          className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brut-muted transition-colors hover:text-brut-ink"
        >
          <MessageCircle className="h-[16px] w-[16px]" />
          {info.comments_count > 0
            ? `${info.comments_count} commentaire${info.comments_count > 1 ? "s" : ""}`
            : "Commenter"}
        </button>
      </div>

      {ouvert && (
        <div className="mt-5">
          <BrutFil entityData={info} entityType="INFORMATION" />
        </div>
      )}
    </section>
  );
}

export default PpefInformationBlock;

"use client";

import React from "react";
import { useFilQuery } from "@/features/commentaire/queries/fil.query";
import AvisForm from "@/features/commentaire/components/avis-form";
import { BrutComment } from "@/components/brut/brut-comment";

// Fil communautaire d'un contenu : formulaire de commentaire + discussion
// threadée (commentaires → réponses), likes et badges admin. Réutilisable sur
// tous les contenus (article, A Barthelemy Inabo, PPEF…).
export function BrutFil({
  entityData,
  entityType,
}: {
  entityData: any; // l'entité (doit exposer `id`)
  entityType: string; // "ARTICLE" | "DAILY" | ...
}) {
  const entityId = entityData?.id != null ? String(entityData.id) : "";
  const { data: comments = [], isLoading } = useFilQuery({
    entityType: entityType.toUpperCase(),
    entityId,
  });

  return (
    <section>
      <div className="mb-8 rounded-2xl border border-brut-line bg-brut-surface p-5">
        <AvisForm data={entityData} type={entityType} />
      </div>

      <div className="mb-5 flex items-baseline gap-2">
        <h3 className="font-display text-[19px] font-black -tracking-[0.02em] text-brut-ink">Discussion</h3>
        {comments.length > 0 && (
          <span className="font-mono text-[12px] text-brut-muted">
            {comments.length} commentaire{comments.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-brut-raise" />
              <div className="h-16 flex-1 animate-pulse rounded-2xl bg-brut-raise" />
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <p className="text-[14px] text-brut-muted">Soyez le premier à réagir.</p>
      ) : (
        <div className="space-y-5">
          {comments.map((c) => (
            <BrutComment key={c.id} comment={c} entityData={entityData} entityType={entityType} />
          ))}
        </div>
      )}
    </section>
  );
}

export default BrutFil;

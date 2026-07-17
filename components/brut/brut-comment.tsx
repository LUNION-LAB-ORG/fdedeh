"use client";

import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { ICommentaire } from "@/features/commentaire/commentaire.type";
import { BrutLikeButton } from "@/components/brut/brut-like-button";
import AvisForm from "@/features/commentaire/components/avis-form";

function tempsEcoule(iso: string): string {
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true, locale: fr });
  } catch {
    return "";
  }
}

function Avatar({ nom, admin }: { nom: string; admin: boolean }) {
  const lettre = (nom || "?").trim().charAt(0).toUpperCase() || "?";
  return (
    <div
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-[14px] font-black",
        admin ? "bg-custom-gradient text-white" : "bg-brut-raise text-brut-ink-soft"
      )}
    >
      {lettre}
    </div>
  );
}

export function BrutComment({
  comment,
  entityData,
  entityType,
  isReply = false,
}: {
  comment: ICommentaire;
  entityData: any;
  entityType: string;
  isReply?: boolean;
}) {
  const [repondre, setRepondre] = useState(false);
  const admin = comment.is_admin;

  return (
    <div className="flex gap-3">
      <Avatar nom={comment.author_name} admin={admin} />
      <div className="min-w-0 flex-1">
        <div className="rounded-2xl bg-brut-raise px-4 py-3">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="text-[14px] font-semibold text-brut-ink">{comment.author_name || "Anonyme"}</span>
            {admin && (
              <span className="rounded-full bg-custom-gradient px-2 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wide text-white">
                Administrateur
              </span>
            )}
          </div>
          <p className="whitespace-pre-line text-[14.5px] leading-relaxed text-brut-ink-soft">{comment.comments}</p>
        </div>

        <div className="mt-1.5 flex items-center gap-4 pl-1 text-[12.5px] text-brut-muted">
          <span>{tempsEcoule(comment.created_at)}</span>
          <BrutLikeButton likeableType="COMMENT" likeableId={comment.id} initialCount={comment.likes_count} size="sm" />
          {!isReply && (
            <button
              type="button"
              onClick={() => setRepondre((v) => !v)}
              className="font-semibold transition-colors hover:text-brut-ink"
            >
              Répondre
            </button>
          )}
        </div>

        {repondre && !isReply && (
          <div className="mt-3 rounded-2xl border border-brut-line bg-brut-surface p-3">
            <AvisForm data={entityData} type={entityType} parentId={comment.id} compact onSubmitted={() => setRepondre(false)} />
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-3 border-l-2 border-brut-line pl-3">
            {comment.replies.map((r) => (
              <BrutComment key={r.id} comment={r} entityData={entityData} entityType={entityType} isReply />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BrutComment;

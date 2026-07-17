"use client";

import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToggleLike } from "@/features/interactions/use-like";
import { aLikeLocal, marquerLikeLocal } from "@/utils/visitor";

// Bouton like réutilisable : sur un contenu (ARTICLE, DAILY, INFORMATION…) ou
// un commentaire (COMMENT). Toggle optimiste ; l'état « liké » vient du
// navigateur (les likes sont dédoublonnés par appareil côté serveur).
export function BrutLikeButton({
  likeableType,
  likeableId,
  initialCount = 0,
  size = "md",
  className,
}: {
  likeableType: string;
  likeableId: number | string;
  initialCount?: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const cle = `${likeableType}:${likeableId}`;
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);
  const { mutate, isPending } = useToggleLike();

  useEffect(() => {
    setLiked(aLikeLocal(cle));
  }, [cle]);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  const onClick = () => {
    if (isPending) return;
    const cible = !liked;

    // Optimiste
    setLiked(cible);
    setCount((c) => Math.max(0, c + (cible ? 1 : -1)));
    marquerLikeLocal(cle, cible);

    mutate(
      { likeable_type: likeableType, likeable_id: likeableId },
      {
        onSuccess: (res) => {
          setLiked(res.liked);
          setCount(res.count);
          marquerLikeLocal(cle, res.liked);
        },
        onError: () => {
          // Retour arrière
          setLiked(!cible);
          setCount((c) => Math.max(0, c + (cible ? -1 : 1)));
          marquerLikeLocal(cle, !cible);
        },
      }
    );
  };

  const petit = size === "sm";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={liked}
      aria-label={liked ? "Retirer le like" : "Liker"}
      className={cn(
        "inline-flex items-center gap-1.5 font-semibold transition-colors",
        petit ? "text-[12.5px]" : "text-[13.5px]",
        liked ? "text-brut-signal" : "text-brut-muted hover:text-brut-ink",
        className
      )}
    >
      <Heart className={cn(petit ? "h-[15px] w-[15px]" : "h-[17px] w-[17px]", liked && "fill-current")} />
      {count > 0 && <span className="tabular-nums">{count}</span>}
    </button>
  );
}

export default BrutLikeButton;

import React from "react";
import { Eye, Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Indicateurs d'engagement (vues / likes / commentaires). Chaque métrique n'est
// affichée que si fournie. Réutilisé sur toutes les cartes et détails.
export function BrutStats({
  views,
  likes,
  comments,
  className,
  size = "sm",
}: {
  views?: number | null;
  likes?: number | null;
  comments?: number | null;
  className?: string;
  size?: "sm" | "md";
}) {
  const icon = size === "md" ? "h-[15px] w-[15px]" : "h-[13px] w-[13px]";
  const text = size === "md" ? "text-[13px]" : "text-[12px]";

  // Les vues restent visibles dès qu'elles sont fournies (métrique de base) ;
  // like et commentaire ne s'affichent qu'à partir d'une interaction réelle
  // pour éviter des « 0 » partout sur les cartes.
  const montrerVues = views != null;
  const montrerLikes = likes != null && likes > 0;
  const montrerCommentaires = comments != null && comments > 0;

  if (!montrerVues && !montrerLikes && !montrerCommentaires) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-3.5 font-mono tabular-nums text-brut-muted", text, className)}>
      {montrerVues && (
        <span className="inline-flex items-center gap-1" title="Vues">
          <Eye className={icon} /> {views}
        </span>
      )}
      {montrerLikes && (
        <span className="inline-flex items-center gap-1" title="J'aime">
          <Heart className={icon} /> {likes}
        </span>
      )}
      {montrerCommentaires && (
        <span className="inline-flex items-center gap-1" title="Commentaires">
          <MessageCircle className={icon} /> {comments}
        </span>
      )}
    </div>
  );
}

export default BrutStats;

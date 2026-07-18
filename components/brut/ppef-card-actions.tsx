"use client";

import React, { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { ThumbsUp, MessageCircle, Share2, Heart, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToggleLike } from "@/features/interactions/use-like";
import { aLikeLocal, marquerLikeLocal } from "@/utils/visitor";

// Barre d'engagement de la carte PPEF (résumé + actions) — agit sur la publication
// entière : J'aime (like optimiste), Commenter (vers le fil du post), Partager (Web
// Share / copie du lien).
export function PpefCardActions({
  slug,
  publicationId,
  initialLikes = 0,
  comments = 0,
  views = 0,
}: {
  slug: string;
  publicationId: number | string;
  initialLikes?: number;
  comments?: number;
  views?: number;
}) {
  const cle = `PPEF:${publicationId}`;
  const href = `/ppef/${slug}`;
  const locale = useLocale();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [copie, setCopie] = useState(false);
  const { mutate, isPending } = useToggleLike();

  useEffect(() => setLiked(aLikeLocal(cle)), [cle]);
  useEffect(() => setLikes(initialLikes), [initialLikes]);

  const toggleLike = () => {
    if (isPending) return;
    const cible = !liked;
    setLiked(cible);
    setLikes((n) => Math.max(0, n + (cible ? 1 : -1)));
    marquerLikeLocal(cle, cible);

    mutate(
      { likeable_type: "PPEF", likeable_id: publicationId },
      {
        onSuccess: (res) => {
          setLiked(res.liked);
          setLikes(res.count);
          marquerLikeLocal(cle, res.liked);
        },
        onError: () => {
          setLiked(!cible);
          setLikes((n) => Math.max(0, n + (cible ? -1 : 1)));
          marquerLikeLocal(cle, !cible);
        },
      }
    );
  };

  const partager = async () => {
    const url = `${window.location.origin}/${locale}/ppef/${slug}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "PPEF — fd.info", url });
        return;
      } catch {
        return; // partage annulé par l'utilisateur
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopie(true);
      setTimeout(() => setCopie(false), 2000);
    } catch {
      /* presse-papiers indisponible */
    }
  };

  const aResume = likes > 0 || comments > 0 || views > 0;

  return (
    <>
      {aResume && (
        <div className="flex items-center justify-between px-4 py-2.5 text-[12.5px] text-brut-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="grid h-[18px] w-[18px] place-items-center rounded-full bg-custom-gradient">
              <Heart className="h-[10px] w-[10px] fill-white text-white" />
            </span>
            {likes}
          </span>
          <span className="font-mono">
            {comments > 0 && <>{comments} commentaire{comments > 1 ? "s" : ""} · </>}
            {views} vue{views > 1 ? "s" : ""}
          </span>
        </div>
      )}

      <div className="grid grid-cols-3 border-t border-brut-line">
        <button
          type="button"
          onClick={toggleLike}
          aria-pressed={liked}
          className={cn(
            "flex items-center justify-center gap-2 py-2.5 text-[13.5px] font-semibold transition-colors hover:bg-brut-raise",
            liked ? "text-brut-signal" : "text-brut-muted hover:text-brut-ink"
          )}
        >
          <ThumbsUp className={cn("h-[17px] w-[17px]", liked && "fill-current")} />
          J&apos;aime
        </button>

        <Link
          href={`${href}#commentaires`}
          className="flex items-center justify-center gap-2 py-2.5 text-[13.5px] font-semibold text-brut-muted transition-colors hover:bg-brut-raise hover:text-brut-ink"
        >
          <MessageCircle className="h-[17px] w-[17px]" />
          Commenter
        </Link>

        <button
          type="button"
          onClick={partager}
          className="flex items-center justify-center gap-2 py-2.5 text-[13.5px] font-semibold text-brut-muted transition-colors hover:bg-brut-raise hover:text-brut-ink"
        >
          {copie ? <Check className="h-[17px] w-[17px] text-brut-signal" /> : <Share2 className="h-[17px] w-[17px]" />}
          {copie ? "Lien copié" : "Partager"}
        </button>
      </div>
    </>
  );
}

export default PpefCardActions;

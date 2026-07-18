import React from "react";
import { Link } from "@/i18n/navigation";
import { Heart, MessageCircle, Share2, ThumbsUp, Eye, MoreHorizontal } from "lucide-react";
import { IPpefPublication } from "@/features/ppef/ppef.type";
import { dateFormat } from "@/utils/date-format";

// Carte de publication PPEF façon post Facebook : entête auteur, titre, aperçu des
// informations, résumé d'engagement, puis barre d'actions. Toute la carte mène au détail
// où l'on like/commente chaque information.
export function PpefFeedCard({ publication }: { publication: IPpefPublication }) {
  const href = `/ppef/${publication.slug}`;
  const infos = publication.informations ?? [];
  const total = publication.informations_count ?? infos.length;
  const apercu = infos[0]?.body ?? "";
  const reste = Math.max(0, total - 1);

  const likes = publication.likes_total ?? 0;
  const comments = publication.comments_total ?? 0;
  const vues = publication.view_count ?? 0;
  const aResume = likes > 0 || comments > 0 || vues > 0;

  return (
    <article className="overflow-hidden rounded-2xl border border-brut-line bg-brut-surface">
      {/* Entête auteur */}
      <div className="flex items-center gap-3 px-4 pt-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-custom-gradient font-display text-[15px] font-black text-white">
          FD
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 font-semibold text-brut-ink">
            Fernand Dédeh
            <span className="rounded-full bg-custom-gradient px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide text-white">
              PPEF
            </span>
          </div>
          <div className="font-mono text-[11.5px] text-brut-muted">
            {publication.published_at ? dateFormat(publication.published_at) : "Publication"} · Pôle Pénal Économique
          </div>
        </div>
        <MoreHorizontal className="h-5 w-5 shrink-0 text-brut-muted" aria-hidden />
      </div>

      {/* Titre + aperçu */}
      <Link href={href} className="group block px-4 pb-2 pt-3">
        <h3 className="font-display text-[19px] font-black leading-[1.2] -tracking-[0.02em] text-brut-ink transition-colors group-hover:text-brut-signal">
          {publication.title}
        </h3>
        {apercu && (
          <p className="mt-2 text-[14.5px] leading-relaxed text-brut-ink-soft line-clamp-3">{apercu}</p>
        )}
        {reste > 0 && (
          <span className="mt-1.5 inline-block font-mono text-[12px] font-semibold text-brut-signal">
            + {reste} autre{reste > 1 ? "s" : ""} information{reste > 1 ? "s" : ""} →
          </span>
        )}
      </Link>

      {/* Résumé d'engagement */}
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
            {vues} vue{vues > 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* Barre d'actions façon Facebook */}
      <div className="grid grid-cols-3 border-t border-brut-line">
        {[
          { icon: ThumbsUp, label: "J'aime" },
          { icon: MessageCircle, label: "Commenter" },
          { icon: Share2, label: "Partager" },
        ].map(({ icon: Icon, label }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center justify-center gap-2 py-2.5 text-[13.5px] font-semibold text-brut-muted transition-colors hover:bg-brut-raise hover:text-brut-ink"
          >
            <Icon className="h-[17px] w-[17px]" />
            {label}
          </Link>
        ))}
      </div>
    </article>
  );
}

export default PpefFeedCard;

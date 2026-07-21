import React from "react";
import { Link } from "@/i18n/navigation";
import { MoreHorizontal } from "lucide-react";
import { IPpefPublication } from "@/features/ppef/ppef.type";
import { PpefCardActions } from "@/components/brut/ppef-card-actions";
import { dateFormat } from "@/utils/date-format";

// Carte de publication PPEF façon post Facebook : entête auteur, titre, points
// (informations), puis résumé + barre d'actions fonctionnelle (like / commenter /
// partager) qui agit sur la publication entière.
export function PpefFeedCard({ publication }: { publication: IPpefPublication }) {
  const href = `/ppef/${publication.slug}`;
  const infos = publication.informations ?? [];
  const total = publication.informations_count ?? infos.length;
  const montres = infos.slice(0, 3);
  const restant = Math.max(0, total - montres.length);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-brut-line bg-brut-surface">
      {/* Entête auteur */}
      <div className="flex items-center gap-3 px-4 pt-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-custom-gradient font-display text-[15px] font-black text-white">
          FD
        </span>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-brut-ink">Fernand Dédeh</div>
          <div className="font-mono text-[11.5px] text-brut-muted">
            {publication.published_at ? dateFormat(publication.published_at) : "Publication"} · Pôle Pénal Économique et Financier
          </div>
        </div>
        <MoreHorizontal className="h-5 w-5 shrink-0 text-brut-muted" aria-hidden />
      </div>

      {/* Titre + informations présentées comme des points distincts */}
      <Link href={href} className="group block px-4 pb-2 pt-3">
        <h3 className="font-display text-[19px] font-black leading-[1.2] -tracking-[0.02em] text-brut-ink transition-colors group-hover:text-brut-signal">
          {publication.title}
        </h3>
        {montres.length > 0 && (
          <ul className="mt-2.5 space-y-2">
            {montres.map((info) => (
              <li key={info.id} className="flex gap-2.5 text-[14px] leading-snug text-brut-ink-soft">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brut-signal" aria-hidden />
                <span className="line-clamp-2">{info.body}</span>
              </li>
            ))}
          </ul>
        )}
        {restant > 0 && (
          <span className="mt-2.5 inline-block font-mono text-[12px] font-semibold text-brut-signal">
            + {restant} autre{restant > 1 ? "s" : ""} point{restant > 1 ? "s" : ""} →
          </span>
        )}
      </Link>

      <div className="mt-auto">
        <PpefCardActions
          slug={publication.slug}
          publicationId={publication.id}
          initialLikes={publication.likes_count ?? 0}
          comments={publication.comments_count ?? 0}
          views={publication.view_count ?? 0}
        />
      </div>
    </article>
  );
}

export default PpefFeedCard;

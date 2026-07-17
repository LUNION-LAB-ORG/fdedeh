import React from "react";
import { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { obtenirListePpefAction } from "@/features/ppef/ppef.action";
import { BrutPageHeader } from "@/components/brut/brut-page-header";
import { BrutStats } from "@/components/brut/brut-stats";
import { dateFormat } from "@/utils/date-format";

export const metadata: Metadata = {
  title: "PPEF — Pôle Pénal Économique et Financier",
  description: "Les audiences du Pôle Pénal Économique et Financier, information par information.",
};

export default async function PpefListPage() {
  const res = await obtenirListePpefAction();
  const publications = res.success ? res.data?.data ?? [] : [];

  return (
    <>
      <BrutPageHeader
        eyebrow="Pôle Pénal Économique et Financier"
        title="PPEF"
        subtitle="Les audiences du Pôle Pénal Économique et Financier, information par information."
      />
      <div className="px-6 py-12 lg:px-11">
        {publications.length === 0 ? (
          <p className="text-brut-muted">Aucune publication pour le moment.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {publications.map((p) => (
              <Link
                key={p.id}
                href={`/ppef/${p.id}`}
                className="group rounded-2xl border border-brut-line bg-brut-surface p-6 transition-colors hover:border-brut-ink"
              >
                <span className="inline-block rounded-full bg-custom-gradient px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-white">
                  PPEF
                </span>
                <h3 className="mt-3 font-display text-[19px] font-black leading-[1.15] -tracking-[0.02em] text-brut-ink transition-colors group-hover:text-brut-signal">
                  {p.title}
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] text-brut-muted">
                  <span>{p.informations_count ?? 0} informations</span>
                  {p.published_at && <span>{dateFormat(p.published_at)}</span>}
                  <BrutStats views={p.view_count} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

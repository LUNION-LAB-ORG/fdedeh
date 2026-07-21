import React from "react";
import { Metadata } from "next";
import { obtenirListePpefAction } from "@/features/ppef/ppef.action";
import { BrutPageHeader } from "@/components/brut/brut-page-header";
import { PpefFeedCard } from "@/components/brut/ppef-feed-card";

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
      <div className="px-4 py-10 lg:px-6">
        {publications.length === 0 ? (
          <p className="text-brut-muted">Aucune publication pour le moment.</p>
        ) : (
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {publications.map((p) => (
              <PpefFeedCard key={p.id} publication={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

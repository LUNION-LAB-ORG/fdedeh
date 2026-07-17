import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrutPageHeader } from "@/components/brut/brut-page-header";
import { BrutDailyCard } from "@/components/brut/brut-daily-card";
import DailiesPagination from "@/features/dailies/components/dailies-pagination";
import { obtenirTousDailiesAction } from "@/features/dailies/dailies.action";

export const metadata: Metadata = {
  title: "A Barthelemy Inabo",
  description: "Toutes les publications quotidiennes de Fernand Dédeh, jour après jour.",
};

type Props = {
  searchParams: Promise<{ page?: string }>;
};

async function DailiesArchivePage({ searchParams }: Props) {
  const { page } = await searchParams;
  const pageDemandee = Math.max(1, Number(page) || 1);

  const resultat = await obtenirTousDailiesAction({ page: pageDemandee });
  const dailies = resultat.data?.data ?? [];
  const meta = resultat.data?.meta;

  // Une page au-delà de la dernière n'existe pas : 404 plutôt qu'une page vide,
  // sinon `?page=999` reste indexable à l'infini.
  if (resultat.success && meta && pageDemandee > meta.last_page) {
    notFound();
  }

  return (
    <>
      <BrutPageHeader
        eyebrow="A Barthelemy Inabo"
        title="Archives"
        subtitle={
          resultat.success && meta
            ? `${meta.total} publications quotidiennes — page ${meta.current_page} sur ${meta.last_page}.`
            : "Toutes les publications quotidiennes, jour après jour."
        }
      />

      <div className="px-6 py-12 lg:px-11">
        {dailies.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dailies.map((daily) => (
              <BrutDailyCard daily={daily} key={`daily-${daily.id}`} />
            ))}
          </div>
        ) : (
          <p className="text-brut-muted">
            {resultat.success
              ? "Aucune publication pour le moment."
              : "Les archives sont momentanément indisponibles. Réessayez dans un instant."}
          </p>
        )}

        {meta && meta.last_page > 1 && (
          <DailiesPagination pageCourante={meta.current_page} dernierePage={meta.last_page} />
        )}
      </div>
    </>
  );
}

export default DailiesArchivePage;

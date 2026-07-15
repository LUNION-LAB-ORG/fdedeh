import React from 'react';
import { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTitle from "@/components/blocks/page-title";
import Publicite from "@/components/publicite";
import DailyCard from "@/features/dailies/components/daily-card";
import DailiesPagination from "@/features/dailies/components/dailies-pagination";
import { obtenirTousDailiesAction } from "@/features/dailies/dailies.action";

export const metadata: Metadata = {
	title: "Archives des dailies - Fdedeh",
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
		<div className="page-container">
			<PageTitle title="Archives" />

			{resultat.success && meta && (
				<p className="mt-6 text-center text-sm text-[#595959]">
					{meta.total} publications quotidiennes — page {meta.current_page} sur {meta.last_page}
				</p>
			)}

			{dailies.length > 0 ? (
				<div className="grid-article-screen">
					{dailies.map((daily) => (
						<DailyCard daily={daily} key={`daily-${daily.id}`} />
					))}
				</div>
			) : (
				<p className="mt-12 text-center text-gray-500">
					{resultat.success
						? "Aucune publication pour le moment."
						: "Les archives sont momentanément indisponibles. Réessayez dans un instant."}
				</p>
			)}

			{meta && meta.last_page > 1 && (
				<DailiesPagination pageCourante={meta.current_page} dernierePage={meta.last_page} />
			)}

			<Publicite className="w-full mt-12" bannerPosition="FOOTER" />
		</div>
	);
}

export default DailiesArchivePage;

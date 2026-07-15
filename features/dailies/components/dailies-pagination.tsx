import React from 'react';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

// Fenêtre glissante : 35 pages ne tiennent pas à l'écran, on garde les extrémités,
// les voisines de la page courante, et des ellipses entre les deux.
function pagesAAfficher(pageCourante: number, dernierePage: number): (number | "...")[] {
	const pages = new Set<number>([1, dernierePage]);
	for (let p = pageCourante - 1; p <= pageCourante + 1; p++) {
		if (p >= 1 && p <= dernierePage) pages.add(p);
	}

	const triees = [...pages].sort((a, b) => a - b);
	const avecEllipses: (number | "...")[] = [];
	triees.forEach((page, index) => {
		if (index > 0 && page - triees[index - 1] > 1) avecEllipses.push("...");
		avecEllipses.push(page);
	});
	return avecEllipses;
}

function DailiesPagination({ pageCourante, dernierePage }: { pageCourante: number; dernierePage: number }) {
	const lien = (page: number) => (page <= 1 ? "/dailies" : `/dailies?page=${page}`);

	return (
		<Pagination className="mt-12">
			<PaginationContent>
				{pageCourante > 1 && (
					<PaginationItem>
						<PaginationPrevious href={lien(pageCourante - 1)} />
					</PaginationItem>
				)}

				{pagesAAfficher(pageCourante, dernierePage).map((page, index) => (
					<PaginationItem key={`${page}-${index}`}>
						{page === "..." ? (
							<PaginationEllipsis />
						) : (
							<PaginationLink href={lien(page)} isActive={page === pageCourante}>
								{page}
							</PaginationLink>
						)}
					</PaginationItem>
				))}

				{pageCourante < dernierePage && (
					<PaginationItem>
						<PaginationNext href={lien(pageCourante + 1)} />
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
}

export default DailiesPagination;

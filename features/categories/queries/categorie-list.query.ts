import React from "react";
import {useQuery} from "@tanstack/react-query";
import getQueryClient from "@/lib/get-query-client";
import {categoriesKeyQuery} from "./index.query";
import {obtenirToutesCategoriesAction} from "../categorie.action";

const queryClient = getQueryClient();

// 1- Option de requête optimisée pour les catégories
export const categorieListQueryOption = () => ({
	queryKey: categoriesKeyQuery("list"),
	queryFn: async () => {
		const result = await obtenirToutesCategoriesAction();
		if (!result.success) {
			throw new Error("Erreur lors de la récupération des catégories");
		}
		return result.data!;
	},
	placeholderData: (previousData: any) => previousData,
	staleTime: 30 * 1000,
	refetchOnWindowFocus: false,
	refetchOnMount: true,
});

export const useCategorieListQuery = () => {
	const query = useQuery(categorieListQueryOption());

	React.useEffect(() => {
		if (query.isError && query.error) {
			console.error("Erreur lors de la récupération des catégories:", query.error);
		}
	}, [query]);

	return query;
};

// Fonction pour précharger les catégories
export const prefetchCategorieListQuery = () => {
	return queryClient.prefetchQuery(categorieListQueryOption());
};

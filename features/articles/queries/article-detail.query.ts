import React from 'react';

import {useQuery,} from '@tanstack/react-query';
import getQueryClient from '@/lib/get-query-client';
import {obtenirUnArticleAction} from '../actions/article.action';
import {articlesKeyQuery} from './index.query';
import {toast} from 'sonner';

const queryClient = getQueryClient();


//1- Option de requête
export const articleQueryOption = (id: string) => {
	return {
		queryKey: articlesKeyQuery("detail", id),
		queryFn: async () => {
			if (!id) throw new Error("L'identifiant article est requis");

			const result = await obtenirUnArticleAction(id);

			if (!result.success) {
				throw new Error(result.error);
			}

			return result.data;
		},
		enabled: !!id,
	};
};

//2- Hook pour récupérer un article
export const useArticleDetailsQuery = (id: string) => {
	const query = useQuery(articleQueryOption(id));

	// Gestion des erreurs dans le hook
	React.useEffect(() => {
		if (query.isError && query.error) {
			toast.error("Erreur lors de la récupération de l'article:", {
				description: query.error.message,
			});
		}
	}, [query.isError, query.error]);

	return query;
};

//3- Fonction pour précharger un article
export const prefetchArticleQuery = (
	id: string
) => {
	const prefetch = queryClient.prefetchQuery(articleQueryOption(id));
	return { prefetch, queryClient };
}

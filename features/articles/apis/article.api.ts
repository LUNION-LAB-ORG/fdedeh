import {IArticle, IArticleParams} from "@/features/articles/types/article.type";
import {api} from "@/lib/api";
import {LaravelPaginatedResponse} from "@/types";
import {SearchParams} from "ak-api-http";

// L'API ne sait traiter que `page` et `type`. Tout autre paramètre est injecté tel quel
// dans une clause WHERE et provoque une 500 (ex: ?category=sport -> "Unknown column 'category'").
// Le reste du filtrage (catégorie, date...) se fait donc côté client, d'où le besoin
// de rapatrier le corpus complet plus bas.
const PARAMS_SUPPORTES_PAR_LAPI = ["page", "type"] as const;

function versSearchParams(params: IArticleParams): SearchParams {
		const supportes: SearchParams = {};
		for (const cle of PARAMS_SUPPORTES_PAR_LAPI) {
				supportes[cle] = params[cle];
		}
		return supportes;
}

export interface IArticleAPI {
		obtenirTousArticles(params: IArticleParams): Promise<LaravelPaginatedResponse<IArticle>>;
		obtenirArticle(id: string): Promise<{data: IArticle}>;
}

export const articleAPI: IArticleAPI = {
		async obtenirTousArticles(params: IArticleParams): Promise<LaravelPaginatedResponse<IArticle>> {
				const premierePage = await api.request<LaravelPaginatedResponse<IArticle>>({
						endpoint: `/articles`,
						method: "GET",
						searchParams: versSearchParams(params),
				});

				const dernierePage = premierePage.meta?.last_page ?? 1;

				// Page précise demandée : on la rend telle quelle.
				if (params.page !== undefined || dernierePage <= 1) {
						return premierePage;
				}

				// Sinon : l'API plafonne à 10 articles par page et refuse `per_page`, alors que
				// les pages catégorie filtrent côté client. Sans le corpus complet, elles restent vides.
				const pagesSuivantes = await Promise.all(
						Array.from({length: dernierePage - 1}, (_, index) =>
								api.request<LaravelPaginatedResponse<IArticle>>({
										endpoint: `/articles`,
										method: "GET",
										searchParams: versSearchParams({...params, page: index + 2}),
								})
						)
				);

				const tousLesArticles = [...premierePage.data, ...pagesSuivantes.flatMap((page) => page.data)];

				return {
						...premierePage,
						data: tousLesArticles,
						meta: {
								...premierePage.meta,
								current_page: 1,
								per_page: tousLesArticles.length,
								from: tousLesArticles.length ? 1 : null,
								to: tousLesArticles.length || null,
						},
				};
		},

		obtenirArticle(id: string): Promise<{data: IArticle}> {
				return api.request<{data: IArticle}>({
						endpoint: `/articles/${id}`,
						method: "GET",
				});
		},
};

import {IArticle, IArticleParams} from "@/features/articles/types/article.type";
import {api} from "@/lib/api";
import {PaginatedResponse} from "@/types";

export interface IArticleAPI {
		obtenirTousArticles(params: IArticleParams): Promise<PaginatedResponse<IArticle>>;
		obtenirArticle(id: string): Promise<{data: IArticle}>;
}

export const articleAPI: IArticleAPI = {
		obtenirTousArticles(params: IArticleParams): Promise<PaginatedResponse<IArticle>> {
				return api.request<PaginatedResponse<IArticle>>({
						endpoint: `/articles`,
						method: "GET",
						// searchParams: params as SearchParams,
				});
		},

		obtenirArticle(id: string): Promise<{data: IArticle}> {
				return api.request<{data: IArticle}>({
						endpoint: `/articles/${id}`,
						method: "GET",
				});
		},
};
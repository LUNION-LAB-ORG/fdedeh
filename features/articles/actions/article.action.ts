"use server"

import { unstable_cache } from "next/cache";
import { ActionResponse, LaravelPaginatedResponse } from "@/types";
import { articleAPI } from "../apis/article.api";
import { IArticle, IArticleParams } from "../types/article.type";
import { handleServerActionError } from "@/utils/handleServerActionError";

// Rapatrier le corpus complet coûte 6 appels à une API qui répond en ~8s et coupe à 10s.
// DataProvider est monté sur toutes les pages : sans ce cache, chaque visite les rejoue
// et sature l'API jusqu'au timeout (pages blanches).
const obtenirTousArticlesEnCache = unstable_cache(
	async (params: IArticleParams) => articleAPI.obtenirTousArticles(params),
	["articles-liste"],
	{ revalidate: 300, tags: ["articles"] }
);

export const obtenirTousArticlesAction = async (params: IArticleParams): Promise<ActionResponse<LaravelPaginatedResponse<IArticle>>> => {
	try {
		const data = await obtenirTousArticlesEnCache(params);
		return {
			success: true,
			data: data,
			message: "Articles obtenus avec succès",
		}
	} catch (error) {
		return handleServerActionError(error, "Erreur lors de la récupération des articles");
	}
}

export const obtenirUnArticleAction = async (id: string): Promise<ActionResponse<IArticle>> => {
	try {
		const data = await articleAPI.obtenirArticle(id);
		return {
			success: true,
			data: data.data,
			message: "Article obtenu avec succès",
		}
	} catch (error) {
		return handleServerActionError(error, "Erreur lors de la récupération de l'article");
	}
}
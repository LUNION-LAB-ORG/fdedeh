"use server"

import { ActionResponse, PaginatedResponse } from "@/types";
import { articleAPI } from "../apis/article.api";
import { IArticle, IArticleParams } from "../types/article.type";
import { handleServerActionError } from "@/utils/handleServerActionError";

export const obtenirTousArticlesAction = async (params: IArticleParams): Promise<ActionResponse<PaginatedResponse<IArticle>>> => {
	try {
		const data = await articleAPI.obtenirTousArticles(params);
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
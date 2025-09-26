"use server"

import {ActionResponse} from "@/types";
import {handleServerActionError} from "@/utils/handleServerActionError";
import {ICategorie} from "@/features/categories/types/categorie.type";
import {categorieAPI} from "@/features/categories/categorie.api";

export const obtenirToutesCategoriesAction = async (): Promise<ActionResponse<ICategorie[]>> => {
	try {
		const data = await categorieAPI.obtenirToutesCategories();
		return {
			success: true,
			data: data.data,
			message: "Catégories obtenues avec succès",
		};
	} catch (error) {
		return handleServerActionError(error, "Erreur lors de la récupération des catégories");
	}
};

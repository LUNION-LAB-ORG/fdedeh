"use server"

import { ActionResponse, PaginatedResponse } from "@/types";
import { IDaily } from "@/features/dailies/types";
import { handleServerActionError } from "@/utils/handleServerActionError";
import { dailyAPI } from "@/features/dailies/dailies.api";

export const obtenirTousDailiesAction = async (): Promise<ActionResponse<PaginatedResponse<IDaily>>> => {
	try {
		const data = await dailyAPI.obtenirTousDailies({});
		return {
			success: true,
			data: data,
			message: "Dailies obtenus avec succès",
		}
	} catch (error) {
		return handleServerActionError(error, "Erreur lors de la récupération des dailies");
	}
}

export const obtenirUnDailyAction = async (id: string): Promise<ActionResponse<IDaily>> => {
	try {
		const data = await dailyAPI.obtenirDaily(id);

		return {
			success: true,
			data: data.data,
			message: "Daily obtenu avec succès",
		}
	} catch (error) {
		return handleServerActionError(error, "Erreur lors de la récupération du daily");
	}
}
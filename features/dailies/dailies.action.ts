"use server"

import { unstable_cache } from "next/cache";
import { ActionResponse, LaravelPaginatedResponse } from "@/types";
import { IDaily, IDailyParams } from "@/features/dailies/types";
import { handleServerActionError } from "@/utils/handleServerActionError";
import { dailyAPI } from "@/features/dailies/dailies.api";

// L'API répond en ~8s et le client coupe à 10s ; DataProvider redemande la liste sur
// chaque page. Le cache évite de la saturer, et les pages blanches qui s'ensuivent.
const obtenirTousDailiesEnCache = unstable_cache(
	async (params: IDailyParams) => dailyAPI.obtenirTousDailies(params),
	["dailies-liste"],
	{ revalidate: 300, tags: ["dailies"] }
);

export const obtenirTousDailiesAction = async (params: IDailyParams = {}): Promise<ActionResponse<LaravelPaginatedResponse<IDaily>>> => {
	try {
		const data = await obtenirTousDailiesEnCache(params);
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

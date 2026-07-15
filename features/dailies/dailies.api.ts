import { IDaily, IDailyParams } from "@/features/dailies/types";
import { api } from "@/lib/api";
import { LaravelPaginatedResponse } from "@/types";
import { SearchParams } from "ak-api-http";

// L'API n'accepte que `page`. Tout autre paramètre part dans une clause WHERE et
// renvoie une 500 (`?per_page=50` -> "Unknown column 'per_page'").
function versSearchParams(params: IDailyParams): SearchParams {
	return { page: params.page };
}

export interface IDailyAPI {
	obtenirTousDailies(params: IDailyParams): Promise<LaravelPaginatedResponse<IDaily>>;
	obtenirDaily(id: string): Promise<{ data: IDaily }>;
}

export const dailyAPI: IDailyAPI = {
	obtenirTousDailies(params: IDailyParams): Promise<LaravelPaginatedResponse<IDaily>> {
		return api.request<LaravelPaginatedResponse<IDaily>>({
			endpoint: `/dailies`,
			method: "GET",
			searchParams: versSearchParams(params),
		});
	},

	obtenirDaily(id: string): Promise<{ data: IDaily }> {
		return api.request<{ data: IDaily }>({
			endpoint: `/dailies/${id}`,
			method: "GET",
		});
	},
};

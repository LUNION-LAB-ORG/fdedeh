import { IDaily, IDailyParams } from "@/features/dailies/types";
import { api } from "@/lib/api";
import { PaginatedResponse } from "@/types";

export interface IDailyAPI {
	obtenirTousDailies(params: IDailyParams): Promise<PaginatedResponse<IDaily>>;
	obtenirDaily(id: string): Promise<{ data: IDaily }>;
}

export const dailyAPI: IDailyAPI = {
	obtenirTousDailies(params: IDailyParams): Promise<PaginatedResponse<IDaily>> {
		return api.request<PaginatedResponse<IDaily>>({
			endpoint: `/dailies`,
			method: "GET",
			// searchParams: params as SearchParams,
		});
	},

	obtenirDaily(id: string): Promise<{ data: IDaily }> {
		return api.request<{ data: IDaily }>({
			endpoint: `/dailies/${id}`,
			method: "GET",
		});
	},
};

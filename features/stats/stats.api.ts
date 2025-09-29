import { api } from "@/lib/api";
import { StatsDto } from "@/features/stats/stats.schema";

export interface IstatsAPI {
	enregistrerStats(payload: StatsDto): Promise<{ data: any }>;
}

export const statsAPI: IstatsAPI = {
	enregistrerStats(payload: StatsDto) {
		return api.request({
			endpoint: `/events`,
			method: "POST",
			data: {
				type: payload.type.toUpperCase(),
				id: payload.id,
				event: payload.event,
			},
		});
	},
};
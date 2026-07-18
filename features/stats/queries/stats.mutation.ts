"use client";

import { useInvalidateStatsQuery } from "@/features/stats/queries/index.query";
import { enregistrerStatsAction } from "@/features/stats/stats.action";
import { Stats, StatsSchema } from "@/features/stats/stats.schema";
import { useMutation } from "@tanstack/react-query";
import { processAndValidateFormData } from "ak-zod-form-kit";

export const useEnregistrerStatsMutation = () => {
	const invalidateStatsQuery = useInvalidateStatsQuery();

	return useMutation({
		mutationFn: async (data: Stats) => {
			const validation = processAndValidateFormData(StatsSchema, data, {
				outputFormat: "object",
			});

			if (!validation.success) {
				throw new Error(validation.errorsInString || "Erreur de validation des statistiques.");
			}

			const result = await enregistrerStatsAction(validation.data as Stats);

			if (!result.success) {
				throw new Error("Erreur lors de l'enregistrement des statistiques");
			}

			return result.data!;
		},
		// `variables` = l'entrée envoyée (id + type) ; la réponse API ne contient que view_count.
		onSuccess: async (_result, variables) => {
			await invalidateStatsQuery(variables.id, variables.type);
		},
		onError: async (error) => {
			console.error("Erreur lors de l'enregistrement des statistiques", error);
			// toast.error("Erreur lors de l'enregistrement des statistiques", {
			// 	description: (error as Error).message,
			// });
		},
	});
};

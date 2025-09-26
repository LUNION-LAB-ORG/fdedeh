"use client";

import {useInvalidateCommentaireQuery} from "@/features/commentaire/queries/index.query";
import {useMutation} from "@tanstack/react-query";
import {CommentaireAddDTO, CommentaireAddSchema} from "@/features/commentaire/commentaire.schema";
import {processAndValidateFormData} from "ak-zod-form-kit";
import {ajouterCommentaireAction} from "@/features/commentaire/commentaire.action";
import {toast} from "sonner";

export const useAjouterCommentaireMutation = () => {
	const invalidateCommentaireQuery = useInvalidateCommentaireQuery()

	return useMutation({
		mutationFn: async (data: CommentaireAddDTO) => {
			console.log("data to submit", data)
			// Validation des données
			const validation = processAndValidateFormData(CommentaireAddSchema, data,
				{
					outputFormat: "object",
				})

			if (!validation.success) {
				throw new Error(validation.errorsInString || "Une erreur est survenue lors de la validation des données.");
			}

			// Appel de l'API avec l'action
			const result = await ajouterCommentaireAction(validation.data as CommentaireAddDTO);

			if (!result.success) {
				throw new Error(result.error || "Erreur lors de l'ajout du commentaire");
			}

			return result.data!;
		},
		onSuccess: async (data: CommentaireAddDTO) => {
			await invalidateCommentaireQuery(data.entityId, data.entityType);
			toast.success("Commentaire ajouté avec succès");
		},

		onError: async (error) => {
			console.log("error query", error)
			toast.error("Erreur lors de l'ajout du commentaire:", {
				description: (error as Error).message,
			});
		}
	})
}
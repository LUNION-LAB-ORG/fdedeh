import { ICommentaire } from "@/features/commentaire/commentaire.type";
import { CommentaireAddDTO } from "@/features/commentaire/commentaire.schema";
import { api } from "@/lib/api";
import { LaravelPaginatedResponse } from "@/types";

export interface ICommentaireApi {
	ajouterCommentaire(data: CommentaireAddDTO): Promise<any>;
	obtenirCommentaires(p: { entityId: string; entityType: string; page?: number }): Promise<LaravelPaginatedResponse<ICommentaire>>;
	obtenirFil(p: { entityType: string; entityId: string }): Promise<{ data: ICommentaire[] }>;
}

export const commentaireApi: ICommentaireApi = {
	ajouterCommentaire(data: CommentaireAddDTO): Promise<any> {
		return api.request<any>({
			endpoint: `/comments`,
			method: "POST",
			data: {
				item_id: data.entityId,
				type: data.entityType.toUpperCase(),
				fullname: data.fullName,
				email: data.email,
				comments: data.comment,
				// Renseigné uniquement pour une réponse à un commentaire.
				...(data.parentId ? { parent_id: data.parentId } : {}),
			},
		});
	},

	obtenirCommentaires({ entityId, entityType, page = 1 }: { entityId: string; entityType: string; page?: number }): Promise<LaravelPaginatedResponse<ICommentaire>> {
		return api.request<LaravelPaginatedResponse<ICommentaire>>({
			endpoint: `/items/${entityType}/${entityId}/comments`,
			method: "GET",
			searchParams: { entityType, page },
		})
	},

	// Fil communautaire : commentaires de premier niveau + réponses imbriquées.
	obtenirFil({ entityType, entityId }: { entityType: string; entityId: string }): Promise<{ data: ICommentaire[] }> {
		return api.request<{ data: ICommentaire[] }>({
			endpoint: `/items/${entityType.toUpperCase()}/${entityId}/comments`,
			method: "GET",
		})
	},
}

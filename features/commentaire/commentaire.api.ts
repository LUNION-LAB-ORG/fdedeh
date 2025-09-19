import { ICommentaire } from "@/features/commentaire/commentaire.type";
import { CommentaireAddDTO } from "@/features/commentaire/commentaire.schema";
import { api } from "@/lib/api";
import { LaravelPaginatedResponse } from "@/types";

export interface ICommentaireApi {
	ajouterCommentaire(data: CommentaireAddDTO): Promise<any>;
	obtenirCommentaires({ entityId, entityType, page }: {
		entityId: string;
		entityType: string;
		page?: number;
	}): Promise<LaravelPaginatedResponse<ICommentaire>>;
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
			},
		});
	},

	obtenirCommentaires({ entityId, entityType, page = 1 }: { entityId: string; entityType: string; page?: number }): Promise<LaravelPaginatedResponse<ICommentaire>> {
		return api.request<LaravelPaginatedResponse<ICommentaire>>({
			endpoint: `/items/${entityType}/${entityId}/comments`,
			method: "GET",
			searchParams: { entityType, page },
		})
	}
}
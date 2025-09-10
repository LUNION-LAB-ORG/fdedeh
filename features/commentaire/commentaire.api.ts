import {ICommentaire} from "@/features/commentaire/commentaire.type";
import {CommentaireAddDTO} from "@/features/commentaire/commentaire.schema";
import {api} from "@/lib/api";

export interface ICommentaireApi {
	ajouterCommentaire(data: CommentaireAddDTO): Promise<any>;
	obtenirCommentaires({ entityId, entityType }: {
		entityId: string;
		entityType: string;
	}): Promise<ICommentaire[]>;
}

export const commentaireApi: ICommentaireApi = {
	ajouterCommentaire(data: CommentaireAddDTO): Promise<any> {
		return api.request<any>({
			endpoint: `/comments`,
			method: "POST",
			data,
		});
	},

	obtenirCommentaires({ entityId, entityType }: { entityId: string; entityType: string; }): Promise<ICommentaire[]> {
		return api.request<ICommentaire[]>({
			endpoint: `/comments`,
			method: "GET",
			searchParams: { entityId, entityType },
		})
	}
}
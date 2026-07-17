"use server";

import { commentaireApi } from "@/features/commentaire/commentaire.api";
import { CommentaireAddDTO } from "@/features/commentaire/commentaire.schema";
import { ICommentaire } from "@/features/commentaire/commentaire.type";
import { LaravelPaginatedResponse } from "@/types";
import { handleServerActionError } from "@/utils/handleServerActionError";

// Types de réponse génériques
interface ActionResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

export const ajouterCommentaireAction = async (formdata: CommentaireAddDTO): Promise<ActionResponse<any>> => {
    try {
        const data = await commentaireApi.ajouterCommentaire(formdata);
        
        return {
            success: true,
            data,
            message: "Commentaire ajouté avec succès",
        };
    } catch (error) {
        return handleServerActionError(error, "Erreur lors de l'ajout du commentaire");
    }
};

export const obtenirCommentairesAction = async ({ entityId, entityType, page = 1 }: { entityId: string; entityType: string; page?: number }): Promise<ActionResponse<LaravelPaginatedResponse<ICommentaire>>> => {
    try {
        const data = await commentaireApi.obtenirCommentaires({ entityId, entityType, page });

        return {
            success: true,
            data,
            message: "Commentaires obtenus avec succès",
        };
    } catch (error) {
        return handleServerActionError(error, "Erreur lors de la récupération des commentaires");
    }
};

export const obtenirFilAction = async ({ entityType, entityId }: { entityType: string; entityId: string }): Promise<ActionResponse<{ data: ICommentaire[] }>> => {
    try {
        const data = await commentaireApi.obtenirFil({ entityType, entityId });

        return {
            success: true,
            data,
            message: "Fil obtenu avec succès",
        };
    } catch (error) {
        return handleServerActionError(error, "Erreur lors de la récupération du fil");
    }
};


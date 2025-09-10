"use server";

import {commentaireApi} from "@/features/commentaire/commentaire.api";
import {CommentaireAddDTO} from "@/features/commentaire/commentaire.schema";
import {ICommentaire} from "@/features/commentaire/commentaire.type";
import {handleServerActionError} from "@/utils/handleServerActionError";

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

export const obtenirCommentairesAction = async ({ entityId, entityType }: { entityId: string; entityType: string; }): Promise<ActionResponse<ICommentaire[]>> => {
    try {
        const data = await commentaireApi.obtenirCommentaires({ entityId, entityType });
        return {
            success: true,
            data,
            message: "Commentaires obtenus avec succès",
        };
    } catch (error) {
        return handleServerActionError(error, "Erreur lors de la récupération des commentaires");
    }
};


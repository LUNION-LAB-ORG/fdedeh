import { obtenirCommentairesAction } from '@/features/commentaire/commentaire.action';
import React from "react";
import { useQuery } from "@tanstack/react-query";
import getQueryClient from "@/lib/get-query-client";
import { commentaireKeyQuery } from "./index.query";

type listQuery = {
    entityId: string;
    entityType: string;
    page?: number;
}

const queryClient = getQueryClient();

// 1- Option de requête optimisée
export const commentaireListQueryOption = ({
    entityId,
    entityType,
    page = 1
}: listQuery) => ({
    queryKey: commentaireKeyQuery("list", { entityId, entityType, page }),
    queryFn: async () => {
        const result = await obtenirCommentairesAction({ entityId, entityType, page });
        if (!result.success) {
            throw new Error("Erreur lors de la récupération des commentaires");
        }
        return result.data!;
    },
    placeholderData: (previousData: any) => previousData,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
});

export default function useCommentaireListQuery({ entityId, entityType, page }: listQuery) {
    const query = useQuery(commentaireListQueryOption({ entityId, entityType, page }));

    // Gestion des erreurs dans le hook
    React.useEffect(() => {
        if (query.isError && query.error) {
            console.error("Erreur lors de la récupération des commentaires:", query.error);
        }
    }, [query]);

    return query;
}

// Fonction pour précharger les commentaires appelée dans les pages
export const prefetchCommentaireListQuery = ({ entityId, entityType }: listQuery) => {
    return queryClient.prefetchQuery(commentaireListQueryOption({ entityId, entityType }));
};
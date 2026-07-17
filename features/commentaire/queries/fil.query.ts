"use client";

import { useQuery } from "@tanstack/react-query";
import { obtenirFilAction } from "@/features/commentaire/commentaire.action";
import { commentaireKeyQuery } from "./index.query";
import { ICommentaire } from "@/features/commentaire/commentaire.type";

// Fil communautaire d'un contenu : commentaires de premier niveau + réponses.
// La clé commence par « commentaire » → rafraîchi automatiquement après un post
// (voir useAjouterCommentaireMutation qui refetch les requêtes commentaire actives).
export function useFilQuery({ entityType, entityId }: { entityType: string; entityId: string }) {
  return useQuery<ICommentaire[]>({
    queryKey: commentaireKeyQuery("fil", entityType, entityId),
    queryFn: async () => {
      const res = await obtenirFilAction({ entityType, entityId });
      if (!res.success) {
        throw new Error(res.error || "Erreur lors de la récupération du fil");
      }
      return res.data?.data ?? [];
    },
    staleTime: 30 * 1000,
    refetchOnWindowFocus: false,
  });
}

"use client";

import { useMutation } from "@tanstack/react-query";
import { basculerLikeAction } from "./like.action";
import { jetonVisiteur } from "@/utils/visitor";

// Bascule un like sur une cible (contenu ou commentaire). Le jeton d'appareil
// est injecté ici (côté client). Renvoie { liked, count }.
export function useToggleLike() {
  return useMutation({
    mutationFn: async (input: { likeable_type: string; likeable_id: number | string }) => {
      const res = await basculerLikeAction({
        likeable_type: input.likeable_type,
        likeable_id: input.likeable_id,
        visitor_key: jetonVisiteur(),
      });
      if (!res.success || !res.data) {
        throw new Error(res.error || res.message || "Erreur lors du like");
      }
      return res.data;
    },
  });
}

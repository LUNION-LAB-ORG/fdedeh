"use server";

import { api } from "@/lib/api";
import { handleServerActionError } from "@/utils/handleServerActionError";

interface ActionResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export type BasculerLikeInput = {
  likeable_type: string;
  likeable_id: number | string;
  visitor_key: string;
};

export type LikeResult = { liked: boolean; count: number };

export const basculerLikeAction = async (input: BasculerLikeInput): Promise<ActionResponse<LikeResult>> => {
  try {
    const data = await api.request<LikeResult>({
      endpoint: "/likes/toggle",
      method: "POST",
      data: {
        likeable_type: input.likeable_type,
        likeable_id: input.likeable_id,
        visitor_key: input.visitor_key,
      },
    });
    return { success: true, data };
  } catch (error) {
    return handleServerActionError(error, "Erreur lors du like");
  }
};

export const compterLikesAction = async (input: { likeable_type: string; likeable_id: number | string }): Promise<ActionResponse<{ count: number }>> => {
  try {
    const data = await api.request<{ count: number }>({
      endpoint: "/likes/count",
      method: "GET",
      searchParams: { likeable_type: input.likeable_type, likeable_id: input.likeable_id },
    });
    return { success: true, data };
  } catch (error) {
    return handleServerActionError(error, "Erreur lors du comptage des likes");
  }
};

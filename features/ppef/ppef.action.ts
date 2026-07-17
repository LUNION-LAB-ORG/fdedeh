"use server";

import { ppefApi } from "@/features/ppef/ppef.api";
import { IPpefPublication } from "@/features/ppef/ppef.type";
import { handleServerActionError } from "@/utils/handleServerActionError";

interface ActionResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export const obtenirListePpefAction = async (): Promise<ActionResponse<{ data: IPpefPublication[] }>> => {
  try {
    const data = await ppefApi.liste();
    return { success: true, data };
  } catch (error) {
    return handleServerActionError(error, "Erreur lors de la récupération des publications PPEF");
  }
};

export const obtenirPpefDetailAction = async (id: string | number): Promise<ActionResponse<{ data: IPpefPublication }>> => {
  try {
    const data = await ppefApi.detail(id);
    return { success: true, data };
  } catch (error) {
    return handleServerActionError(error, "Erreur lors de la récupération de la publication PPEF");
  }
};

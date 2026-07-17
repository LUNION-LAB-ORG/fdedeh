import { api } from "@/lib/api";
import { IPpefPublication } from "@/features/ppef/ppef.type";

export const ppefApi = {
  liste(): Promise<{ data: IPpefPublication[] }> {
    return api.request<{ data: IPpefPublication[] }>({
      endpoint: `/ppef`,
      method: "GET",
    });
  },

  detail(id: string | number): Promise<{ data: IPpefPublication }> {
    return api.request<{ data: IPpefPublication }>({
      endpoint: `/ppef/${id}`,
      method: "GET",
    });
  },
};

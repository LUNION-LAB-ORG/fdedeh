import { api } from "@/lib/api";
import { IPpefPublication } from "@/features/ppef/ppef.type";

export const ppefApi = {
  liste(): Promise<{ data: IPpefPublication[] }> {
    return api.request<{ data: IPpefPublication[] }>({
      endpoint: `/ppef`,
      method: "GET",
    });
  },

  detail(slug: string): Promise<{ data: IPpefPublication }> {
    return api.request<{ data: IPpefPublication }>({
      endpoint: `/ppef/${slug}`,
      method: "GET",
    });
  },
};

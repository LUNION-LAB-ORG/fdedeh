import {api} from "@/lib/api";
import {ICategorie} from "@/features/categories/types/categorie.type";

export interface IcategoryAPI {
	obtenirToutesCategories(): Promise<{
		data: ICategorie[];
	}>;
}

export const categorieAPI: IcategoryAPI = {
	obtenirToutesCategories() {
		return api.request<{
			data: ICategorie[];
		}>({
			endpoint: `/categories`,
			method: "GET",
		});
	},
};

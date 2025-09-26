// utils/generateMenu.ts
import { IMenuItem } from "@/components/partials/public-header/constants";
import { slugify } from "@/features/articles/utils/slugify";
import {ICategorie} from "@/features/categories/types/categorie.type";

export function generatePublicMenuItems(categories: ICategorie[]): IMenuItem[] {
	return [
		{ name: "A la Une", href: "/a-la-une" },
		{
			name: "Actualités nationales",
			href: "#",
			hasSubMenu: true,
			subMenuItems: categories.map(cat => ({
				name: cat.name,
				href: `/actualites-nationales/${slugify(cat.name)}`,
			})),
		},
		// { name: "Sports", href: "/sports" },
		{ name: "Podcasts", href: "/podcasts" },
		{ name: "Galerie", href: "/galerie" },
	];
}
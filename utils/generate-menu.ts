// utils/generateMenu.ts
import { IMenuItem } from "@/components/partials/public-header/constants";
import { slugify } from "@/features/articles/utils/slugify";
import { ICategorie } from "@/features/categories/types/categorie.type";
import { IArticle } from "@/features/articles/types/article.type";

export function generatePublicMenuItems(categories: ICategorie[], articles: IArticle[] = []): IMenuItem[] {
	const categoriesPourvues = new Set(
		articles.map((article) => article.category?.name).filter(Boolean)
	);

	const sousMenu = categories
		// 5 des 19 catégories n'ont aucun article : les exposer mène à une page vide.
		// Tant que les articles ne sont pas chargés, on n'écarte rien (sinon menu vide au premier rendu).
		.filter((cat) => categoriesPourvues.size === 0 || categoriesPourvues.has(cat.name))
		// `Sport` a déjà son entrée de premier niveau, vers le même contenu.
		.filter((cat) => slugify(cat.name) !== "sport")
		.map((cat) => ({
			name: cat.name,
			href: `/actualites-nationales/${slugify(cat.name)}`,
		}));

	return [
		{ name: "A la Une", href: "/a-la-une" },
		{
			name: "Actualités nationales",
			href: "#",
			hasSubMenu: true,
			subMenuItems: sousMenu,
		},
		{ name: "Sports", href: "/sports" },
		{ name: "Podcasts", href: "/podcasts" },
		{ name: "Galerie", href: "/galerie" },
	];
}

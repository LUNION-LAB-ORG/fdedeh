import {ICategorie} from "@/features/categories/types/categorie.type";

export enum ArticleType {
	ARTICLE = 'ARTICLE',
	NEWS = 'NEWS',
	BLOG = 'BLOG',
}

export interface IArticle {
	id: number;
	type: ArticleType;
	title: string;
	slug: string;
	content: string;
	// Image principale. Vide ('' ou null) pour un article vidéo publié sans image de
	// couverture : passer par `couvertureArticle` (utils/article-media.ts) pour l'afficher.
	path_resource: string | null;
	path_audio?: string | null;
	// Vidéo de l'article, à la place de l'image : chemin d'un fichier servi par le backend
	// (`storage/articles/videos/…`) OU lien YouTube. Vide/absent = article image.
	// À lire via `videoArticle` (utils/article-media.ts), jamais directement.
	path_video?: string | null;
	status: boolean;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	created_by: number;
	category_id: number;
	category: ICategorie;
	view_count?: number;
	read_count?: number;
	likes_count?: number;
	comments_count?: number;
}

export interface IArticleParams {
	type?: string;
	title?: string;
	status?: boolean;
	category?: string;
	similar_to?: string;
	created_by?: number;
	created_at?: string;
	page?: number;
	limit?: number;
	skip?:number;
}
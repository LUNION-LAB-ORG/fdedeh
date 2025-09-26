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
	path_resource: string;
	status: boolean;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	created_by: number;
	category_id: number;
	category: ICategorie;
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
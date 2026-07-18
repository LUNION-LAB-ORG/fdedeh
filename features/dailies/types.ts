export interface IDailyImage {
	id: number;
	path_image: string;
}

export interface IDailyHashtag {
	id: number | string;
	hashtag: string;
}

export interface IDailyContent {
	id: string;
	// Titre libre de la section (en-tête sur le site). Remplace le hashtag.
	title?: string | null;
	body: string;
	hashtag_id?: string | null;
	// Ancien hashtag par contenu — conservé pour compat, plus utilisé comme en-tête.
	hashtag?: {
		id: string;
		hashtag: string;
		created_at: string;
		updated_at: string;
	};
	// Image unique historique + galerie multi-images.
	path_image?: string | null;
	images?: IDailyImage[];
	created_at: string;
	updated_at: string;
}

export interface IDailyUser {
	id: string;
	name: string;
}

export interface IDaily {
	id: string;
	published_at: string;
	introduction: string;
	hashtags?: IDailyHashtag[];
	contents: IDailyContent[];
	user: IDailyUser;
	view_count?: number;
	read_count?: number;
	likes_count?: number;
	comments_count?: number;
	created_at: string;
	updated_at: string;
	deleted_at: string;
}

export interface IDailyParams {
	page?: number;
}

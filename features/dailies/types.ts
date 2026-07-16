export interface IDailyContent {
	id: string;
	body: string;
	hashtag_id: string;
	// Absent des réponses de `/dailies/{date}`, qui ne charge pas la relation :
	// seul `/dailies` (la liste) la renvoie.
	hashtag?: {
		id: string;
		hashtag: string;
		created_at: string;
		updated_at: string;
	};
	path_image: string;
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
	contents: IDailyContent[];
	user: IDailyUser;
	view_count?: number;
	read_count?: number;
	created_at: string;
	updated_at: string;
	deleted_at: string;
}

export interface IDailyParams {
	page?: number;
}

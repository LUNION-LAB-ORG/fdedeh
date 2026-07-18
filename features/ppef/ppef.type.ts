export interface IPpefInformation {
  id: number;
  body: string;
  position: number;
  likes_count: number;
  comments_count: number;
}

export interface IPpefPublication {
  id: number;
  slug: string;
  title: string;
  published_at: string | null;
  view_count?: number;
  author_name: string | null;
  informations_count?: number;
  likes_total?: number;
  comments_total?: number;
  informations?: IPpefInformation[];
}

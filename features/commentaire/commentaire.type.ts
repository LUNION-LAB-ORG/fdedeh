export interface ICommentaire {
  id: number;
  author_name: string;
  is_admin: boolean;
  comments: string;
  type: string;
  item_id: number;
  parent_id: number | null;
  likes_count: number;
  created_at: string;
  replies?: ICommentaire[];

  // Champs conservés pour compatibilité avec d'anciens composants (non utilisés
  // par le fil communautaire).
  fullname?: string;
  email?: string;
  entityId?: string;
  entityType?: string;
  updated_at?: string;
}

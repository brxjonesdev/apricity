
export type StoryDetailDTO = {
  id: string;
  series_id: string | null;
  title: string;
  order?: string | null;
  synopsis: string | null;
  cover_image: string | null;
  genre: string[] | null;
  is_archived: boolean;
  status: 0 | 1 | 2 | 3;
  sync_status: 0 | 1 | 2 | 3;
  last_updated: string;
  created_at: string;
  deleted_at: string | null;
};

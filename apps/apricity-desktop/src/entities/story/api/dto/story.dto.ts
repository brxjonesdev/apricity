// The exact row shape Rust hands back.
export type StoryDTO = {
  id: string;
  series_id: string | null;
  order: number | null;
  title: string;
  synopsis: string;
  cover_image: string | null;
  last_updated: string;
  created_at: string;
  is_archived: boolean;
};

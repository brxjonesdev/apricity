export type ChapterDTO = {
  id: string;
  story_id: string;
  order: string;
  title: string;
  synopsis: string | null;
  status: 0 | 1 | 2;
  created_at: string;
  last_updated: string;
};

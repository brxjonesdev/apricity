export type CreateChapterDTO = {
  story_id: string;
  order: number;
  title: string;
  synopsis: string | null;
  status: 0;
  created_at: string;
  last_updated: string;
};

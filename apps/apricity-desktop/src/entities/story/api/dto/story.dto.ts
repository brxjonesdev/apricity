import { StoryStatus } from "../../types";
export type StoryDTO = {
  id: string;
  series_id: string | null;
  order: string | null;
  title: string;
  synopsis: string | null;
  cover_image: string | null;
  last_updated: string;
  created_at: string;
  is_archived: boolean;
  status: StoryStatus;
  genre: string[]
};

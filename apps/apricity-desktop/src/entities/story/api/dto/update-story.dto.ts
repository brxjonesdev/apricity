import { StoryStatus } from "../../types";
export type UpdateStoryDTO = {
  id: string;
  title?: string;
  synopsis?: string | null;
  cover_image?: string | null;
  series_id?: string | null;
  is_archived?: boolean
  status: StoryStatus;
  genre: string[]
};

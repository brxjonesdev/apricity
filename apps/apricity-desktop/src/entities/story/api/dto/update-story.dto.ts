import { StoryGenre } from '../../constants';

export type UpdateStoryDTO = {
  id: string;
  title?: string;
  synopsis?: string | null;
  cover_image?: string | null;
  series_id?: string | null;
  genre?: StoryGenre[] | null;
  is_archived?: boolean
  status?: 0 | 1 | 2 | 3;
};

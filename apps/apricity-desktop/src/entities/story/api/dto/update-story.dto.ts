import { StoryGenre } from '../../constants';

export type UpdateStoryDTO = {
  id: string;
  title?: string;
  synopsis?: string | null;
  cover_image?: string | null;
  genre?: StoryGenre[] | null;
  status?: 0 | 1 | 2 | 3;
};

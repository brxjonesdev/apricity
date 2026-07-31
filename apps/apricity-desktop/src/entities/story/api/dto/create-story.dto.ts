import { StoryGenre } from '../../constants';

export type CreateStoryDTO = {
  seriesId?: string;
  title: string;
  synopsis?: string;
  coverImage?: string;
  genre?: string[];
};

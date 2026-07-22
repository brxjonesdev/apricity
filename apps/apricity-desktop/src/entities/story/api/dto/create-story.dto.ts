import { StoryGenre } from '../../constants';

export type CreateStoryDTO = {
  projectId: string;
  order: number;
  seriesId?: string;
  userId?: string;
  title: string;
  synopsis?: string;
  coverImage?: string;
  genre?: StoryGenre[];
};

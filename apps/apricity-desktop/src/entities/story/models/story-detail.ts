// What the App uses
import { StoryGenre } from '../constants';
export type StoryDetails = {
  storyId: string;
  seriesId: string | null;
  userId: string | null;
  order: number | null;
  title: string;
  synopsis: string;
  coverImage: string | null;
  genre: StoryGenre[] | null;
  status: 'draft' | 'in-progress' | 'complete' | 'archived';
  lastUpdated: Date;
  createdAt: Date;
};

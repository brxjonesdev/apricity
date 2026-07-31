// What the App uses

export type StoryDetails = {
  storyId: string;
  seriesId: string | null;
  order: number | null;
  title: string;
  synopsis: string;
  coverImage: string | null;
  genre: string[] | null;
  status: 'draft' | 'in-progress' | 'complete' | 'archived';
  lastUpdated: Date;
  createdAt: Date;
};

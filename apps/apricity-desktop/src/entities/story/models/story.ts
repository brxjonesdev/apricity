export type StoryStatus = 'draft' | 'in-progress' | 'complete' | 'archived';
export type Story = {
  storyId: string;
  seriesId: string | null;
  title: string;
  synopsis: string;
  coverImage: string | null;
  lastUpdated: Date;
  isArchived: boolean;
};

export type StoryInSeries = {
  storyId: string;
  seriesId: string | null;
  order: number | null;
  title: string;
  synopsis: string;
  coverImage: string | null;
  lastUpdated: Date;
  isArchived: boolean;
};


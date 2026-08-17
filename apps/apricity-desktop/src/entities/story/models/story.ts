export type StoryStatus = 'draft' | 'in-progress' | 'complete' | 'archived';
export type Story = {
  storyId: string;
  seriesId: string | null;
  title: string;
  order: null
  synopsis: string;
  coverImage: string | null;
  lastUpdated: Date;
  isArchived: boolean;
};

export type StoryInSeries = {
  storyId: string;
  seriesId: string | null;
  order: string;
  title: string;
  synopsis: string;
  coverImage: string | null;
  lastUpdated: Date;
  isArchived: boolean;
};


export type StoryStatus = 'draft' | 'in-progress' | 'complete' | 'archived';
export type Story = {
  storyId: string;
  seriesId: string | null;
  order: number | null;
  title: string;
  synopsis: string;
  coverImage: string | null;
  lastUpdated: Date;
  isArchived: boolean;
};

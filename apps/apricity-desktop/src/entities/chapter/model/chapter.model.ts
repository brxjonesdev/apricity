export type Chapter = {
  chapterId: string;
  storyId: string;
  order: number;
  title: string;
  synopsis: string | null;
  status: 'draft' | 'in-progress' | 'complete';
  createdAt: Date;
  lastUpdated: Date;
};

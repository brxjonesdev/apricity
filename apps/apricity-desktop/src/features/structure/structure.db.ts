export type SceneDB = {
  id: string;
  storyId: string;
  chapterId: string;
  synopsis: string | null;
  title: string;
  order: number;
  createdAt: string;
  lastUpdatedAt: string;
  deletedAt?: string;
};

export type ChapterDB = {
  id: string;
  storyId: string;
  title: string;
  summary: string | null;
  order: number;
  createdAt: string;
  lastUpdatedAt: string;
  deletedAt?: string;
};

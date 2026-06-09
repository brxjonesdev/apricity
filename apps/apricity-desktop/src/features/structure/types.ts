export type Chapter = {
  id: string;
  storyId: string;
  title: string;
  summary?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type Scene = {
  id: string;
  storyId: string;
  chapterId: string;
  title: string;
  content?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type ChapterWithScenes = Chapter & {
  scenes: Scene[];
};

export type ChapterCreateInput = Omit<
  Chapter,
  "id" | "createdAt" | "updatedAt"
>;
export type ChapterUpdateInput = Partial<
  Omit<Chapter, "id" | "storyId" | "createdAt" | "updatedAt">
>;

export type SceneCreateInput = Omit<Scene, "id" | "createdAt" | "updatedAt">;
export type SceneUpdateInput = Partial<
  Omit<Scene, "id" | "storyId" | "createdAt" | "updatedAt">
>;

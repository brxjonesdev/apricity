export type SceneDTO = {
  id: string;
  title: string;
  storyId?: string;
  chapterID?: string;
  synopsis?: string;
  order?: number;
};

export type ChapterDTO = {
  id: string;
  title: string;
  storyId?: string;
  order?: number;
  summary?: string;
  scenes?: SceneDTO[];
};

export type ChapterCreateInput = Omit<ChapterDTO, "id">;
export type SceneCreateInput = Omit<SceneDTO, "id">;
export type ChapterUpdateInput = Partial<Omit<ChapterDTO, "storyId">>;
export type SceneUpdateInput = Partial<Omit<SceneDTO, "chapterID" | "storyId">>;

import { StoryGenre } from "./constants";

export type Story = {
  id: string;
  seriesId: string | null;
  userId?: string | null;
  title: string;
  synopsis: string | null;
  coverUrl: string | null;
  genre: StoryGenre | null;
  status: "draft" | "in-progress" | "complete" | "archived";
  syncStatus: "local" | "pending" | "synced" | "conflict";
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  // derived on db read
  totalWordCount?: number;
  totalSceneCount?: number;
  totalChapterCount?: number;
};
export type StoryCreate = Omit<
  Story,
  | "id"
  | "userId"
  | "syncStatus"
  | "createdAt"
  | "updatedAt"
  | "deletedAt"
  | "totalWordCount"
  | "totalSceneCount"
  | "totalChapterCount"
>;

export type StoryUpdate = {
  id: string;
  updates: Partial<
    Omit<
      Story,
      | "id"
      | "userId"
      | "syncStatus"
      | "createdAt"
      | "updatedAt"
      | "deletedAt"
      | "totalWordCount"
      | "totalSceneCount"
      | "totalChapterCount"
    >
  >;
};

export type Series = {
  id: string;
  title: string;
};

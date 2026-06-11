import { StoryGenre } from "./lib/constants";
export type StoryDB = {
  id: string;
  seriesId: string | null;
  userId: string | null;
  title: string;
  synopsis: string | null;
  coverImage: string | null;
  genre: StoryGenre[] | null;
  status: "draft" | "in-progress" | "complete" | "archived";
  syncStatus: "local" | "pending" | "synced" | "conflict";
  lastUpdated: string;
  createdAt: string;
  deletedAt: string | null;
};

import { StoryGenre } from "./lib/constants";
import { StoryDB } from "./story.db";

export type StoryDTO = {
  id: string;
  title: string;
  seriesId: string | null;
  synopsis: string;
  coverImage: string | null;
  genre: StoryGenre[];
  status: "draft" | "in-progress" | "complete" | "archived";
  lastUpdated?: string;
};

export type StoryCreateInput = Omit<StoryDTO, "id" | "status" | "lastUpdated">;
export type StoryUpdateInput = Partial<Omit<StoryDTO, "id">>;

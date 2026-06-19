import { StoryGenre } from "@/features/library/lib/constants";

// Form for adding/updating a story.
export type StoryForm = {
  title: string;
  synopsis: string;
  seriesID: string | null;
  coverImage: string;
  genre: StoryGenre[] | null;
  status?: "draft" | "in-progress" | "complete" | "archived"; // won't be in create form, but will be in update form
};

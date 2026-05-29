export const STORY_GENRES = [
  "Fantasy",
  "Sci-Fi",
  "Cyberpunk",
  "Biopunk",
  "Horror",
  "Mystery",
  "Romance",
  "Thriller",
  "Adventure",
  "Drama",
] as const;

export type StoryGenre = (typeof STORY_GENRES)[number];

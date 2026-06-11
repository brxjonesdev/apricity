import * as z from "zod";

export const CreateStoryFormSchema = z.object({
  title: z.string().min(1),

  synopsis: z.string(),
  coverImage: z.string(),

  genre: z.array(
    z.enum([
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
    ]),
  ),
});

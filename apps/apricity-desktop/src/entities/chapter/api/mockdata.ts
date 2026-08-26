import { ChapterDTO } from './dto/chapter.dto';
import { mockStories } from "@/entities/story";

const now = new Date().toISOString();

export const mockChapters: ChapterDTO[] = mockStories.flatMap((story) =>
  Array.from(
    {
      length: 3 + Math.floor(Math.random() * 3),
    },
    (_, index) => ({
      id: `${story.id}-chapter-${index + 1}`,
      story_id: story.id,
      order: index + 1,
      title: `Chapter ${index + 1}: ${story.title}`,
      synopsis: `Synopsis for chapter ${index + 1}.`,
      status: (index % 3) as 0 | 1 | 2,
      created_at: now,
      last_updated: now,
    }),
  ),
);
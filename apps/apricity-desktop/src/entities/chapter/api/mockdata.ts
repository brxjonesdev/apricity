import { generateKeyBetween } from "fractional-indexing";
import { ChapterDTO } from "./dto/chapter.dto";
import { mockStories } from "@/entities/story";
const now = new Date().toISOString();

export const mockChapters: ChapterDTO[] = mockStories.flatMap((story) => {
  let nextOrder: string | null = null;

  const orders = Array.from({ length: 12 }, () => {
    const order = generateKeyBetween(null, nextOrder);
    nextOrder = order;
    return order;
  }).reverse();

  return orders.map((order, index) => ({
    id: `${story.id}-chapter-${index + 1}`,
    story_id: story.id,
    order,
    title: `Chapter ${index + 1}: ${story.title}`,
    synopsis: `Synopsis for chapter ${index + 1}.`,
    status: (index % 3) as 0 | 1 | 2,
    created_at: now,
    last_updated: now,
  }));
});
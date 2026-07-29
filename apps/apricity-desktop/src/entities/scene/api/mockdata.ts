import { SceneDTO } from './dto/scene.dto';
import { JSONContent } from '@tiptap/core';
import { mockChapters } from '@/entities/chapter';

const now = new Date().toISOString();

export const mockScenes: SceneDTO[] = mockChapters.flatMap((chapter) =>
  Array.from({ length: 3 }, (_, index) => ({
    scene_id: `${chapter.id}-scene-${index + 1}`,
    chapter_id: chapter.id,
    story_id: chapter.story_id,
    title: `Scene ${index + 1}`,
    synopsis: `Scene synopsis for ${chapter.title}`,
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: `Content for ${chapter.title}, Scene ${index + 1}`,
            },
          ],
        },
      ],
    },
    order: index + 1,
    last_updated_at: now,
    created_at: now,
  })),
);

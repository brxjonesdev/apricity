import { SceneDTO } from './dto/scene.dto';
import { JSONContent } from '@tiptap/core';
const mockScenes: SceneDTO[] = [];

for (let chapter = 1; chapter <= 20; chapter++) {
  for (let scene = 1; scene <= 70; scene++) {
    const lastUpdated = new Date(
      Date.now() - Math.floor(Math.random() * 60 * 24 * 60 * 60 * 1000),
    ).toISOString();

    const content: JSONContent = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: `This is Scene ${scene}.`,
            },
          ],
        },
      ],
    };

    mockScenes.push({
      scene_id: `scene_${chapter}_${scene}`,
      chapter_id: `chapter-${chapter}`,
      title: `Scene ${scene} in Chapter ${chapter}`,
      synopsis: `Synopsis for Scene ${scene} in Chapter ${chapter}`,
      content,
      order: scene,
      last_updated_at: Math.random() > 0.5 ? lastUpdated : null,
      created_at: new Date(
        Date.now() - Math.floor(Math.random() * 180 * 24 * 60 * 60 * 1000),
      ).toISOString(),
    });
  }
}

export default mockScenes;

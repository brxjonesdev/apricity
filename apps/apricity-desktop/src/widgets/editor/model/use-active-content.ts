import { useQuery } from '@tanstack/react-query';
import { getSceneById } from "@/entities/scene/api/commands/get-scene-details";
import { getChapterById } from "@/entities/chapter/api/commands/get-chapter-by-id";
import { getScenesByChapterId } from "@/entities/scene/api/commands/get-scenes-by-chapter";
import { buildChapterDoc } from "./build-doc";



export function useActiveContent(id: string | null, type: 'scene' | 'chapter' | null) {
  return useQuery({
    queryKey: [type, id],
    queryFn: async () => {
      if (type === 'scene') {
        const scene = await getSceneById(id!);
        return { content: scene.content, title: scene.title };
      }

      const [chapter, scenes] = await Promise.all([
        getChapterById(id!),
        getScenesByChapterId(id!),
      ]);

      return { content: buildChapterDoc(scenes), title: chapter.title };
    },
    enabled: !!id && !!type,
  });
}

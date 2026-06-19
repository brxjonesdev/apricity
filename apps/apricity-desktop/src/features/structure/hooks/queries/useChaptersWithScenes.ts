import { useQueries } from "@tanstack/react-query";
import { useChapters } from "./useChapters";
import { getScenesByChapter } from "@/features/structure";
import { queryKeys } from "@/features/structure/lib/querykeys";
import { SceneDTO } from "@/features/structure";
import { UseQueryOptions } from "@tanstack/react-query";
import { Result } from "@/shared/types";

export function useChaptersWithScenes(storyId?: string | null) {
  const { data: chaptersResult, isLoading: chaptersLoading } =
    useChapters(storyId);
  const chapters = chaptersResult ?? [];

  const sceneQueries = useQueries({
    queries: chapters.map(
      (chapter): UseQueryOptions<Result<SceneDTO[]>, Error, SceneDTO[]> => ({
        queryKey: queryKeys.structure.scenes.list(chapter.id),
        queryFn: () => getScenesByChapter(chapter.id),
        enabled: chapters.length > 0,
        select: (result) => {
          if (result.ok) return result.data;
          return [];
        },
      }),
    ),
  });

  const chaptersWithScenes = chapters.map((chapter, index) => {
    return { ...chapter, scenes: sceneQueries[index].data as SceneDTO[] };
  });

  const scenesLoading = sceneQueries.some(
    (query) => query.isLoading || query.isFetching,
  );

  return {
    data: chaptersWithScenes,
    isLoading: chaptersLoading || scenesLoading,
  };
}

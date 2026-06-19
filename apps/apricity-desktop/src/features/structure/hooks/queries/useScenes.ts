import { useQuery } from "@tanstack/react-query";
import { getScenesByChapter } from "@/features/structure";
import { queryKeys } from "@/features/structure/lib/querykeys";

export function useScenes(chapterId?: string | null) {
  return useQuery({
    queryKey: queryKeys.structure.scenes.list(chapterId ?? ""),
    queryFn: () => getScenesByChapter(chapterId as string),
    enabled: !!chapterId,
  });
}

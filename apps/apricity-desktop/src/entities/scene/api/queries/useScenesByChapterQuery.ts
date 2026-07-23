import { useQuery } from "@tanstack/react-query";
import { sceneQueries } from "../querykeys";
import { getScenesByChapterId } from "../commands/get-scenes-by-chapter";

export default function useScenesByChapterQuery(chapterId: string) {
  return useQuery({
    queryKey: sceneQueries.byChapter(chapterId),
    queryFn: () => getScenesByChapterId(chapterId),
    enabled: !!chapterId
  })
}
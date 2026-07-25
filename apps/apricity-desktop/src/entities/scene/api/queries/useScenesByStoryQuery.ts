import { useQuery } from "@tanstack/react-query";
import { sceneQueries } from "../querykeys";
import { getScenesByStoryId } from "../commands/get-scenes-by-story";

export function useScenesByStoryQuery(storyId: string) {
  return useQuery({
    queryKey: sceneQueries.byStory(storyId),
    queryFn: () => getScenesByStoryId(storyId),
    enabled: !!storyId
  })
}
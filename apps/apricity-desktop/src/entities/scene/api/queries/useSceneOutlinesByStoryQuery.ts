import { useQuery } from "@tanstack/react-query";
import { sceneQueries } from "../querykeys";
import { getSceneOutlinesByStoryId } from "../commands/get-scene-outlines-by-story";

export function useSceneOutlinesByStoryQuery(storyId: string) {
  return useQuery({
    queryKey: sceneQueries.outline(storyId),
    queryFn: () => getSceneOutlinesByStoryId(storyId),
    enabled: !!storyId
  })
}
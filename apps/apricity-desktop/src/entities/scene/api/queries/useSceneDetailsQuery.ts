import { useQuery } from "@tanstack/react-query";
import { sceneQueries } from "../querykeys";
import { getSceneById } from "../commands/get-scene-details";

export function useSceneDetailsQuery(sceneId: string) {

  return useQuery({
    queryKey: sceneQueries.detail(sceneId),
    queryFn: () => getSceneById(sceneId),
    enabled: !!sceneId
  })
}
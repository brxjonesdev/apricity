import { useQuery } from "@tanstack/react-query";
import { getSceneById } from "@/features/structure";
import { queryKeys } from "@/features/structure/lib/querykeys";

export function useScene(sceneId?: string | null) {
  return useQuery({
    queryKey: queryKeys.structure.scenes.detail(sceneId ?? ""),
    queryFn: () => {
      if (!sceneId) throw new Error("Missing scene id");
      return getSceneById(sceneId);
    },
    enabled: !!sceneId,
  });
}

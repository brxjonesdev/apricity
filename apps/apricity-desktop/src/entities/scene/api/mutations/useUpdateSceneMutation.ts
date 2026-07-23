import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateScene } from "../commands/update-scene";
import { UpdateSceneDTO } from "../dto/scene.update.dto";
import { sceneQueries } from "../querykeys";

export default function useUpdateSceneMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sceneId, updates }: { sceneId: string, updates: UpdateSceneDTO }) => updateScene(sceneId, updates),
    onSuccess: (_, { sceneId }) => {
      queryClient.invalidateQueries({
        queryKey: sceneQueries.detail(sceneId)
      })
      
    }
  })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteScene } from "../commands/delete-scene";
import { sceneQueries } from "../querykeys";

export default function useDeleteSceneMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ sceneId }: { sceneId: string }) => deleteScene(sceneId),
    onSuccess: (_, { sceneId }) => {
      queryClient.removeQueries({
        queryKey: sceneQueries.detail(sceneId)
      })

      queryClient.invalidateQueries({
        queryKey: sceneQueries.lists()
      })
      
    }

  })
}
import { updateScene } from "@/features/structure";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateScenePayload = {
  id: string;
  updates: any;
};

export function useUpdateScene(chapterId?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateScenePayload) =>
      updateScene(payload.id, payload.updates),
    onSuccess: () => {
      if (chapterId) {
        queryClient.invalidateQueries({ queryKey: ["scenes", chapterId] });
      }
    },
  });
}

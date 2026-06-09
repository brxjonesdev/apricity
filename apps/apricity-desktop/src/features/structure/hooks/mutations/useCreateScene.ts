import { createScene } from "@/features/structure";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateScene(chapterId?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createScene,
    onSuccess: () => {
      if (chapterId) {
        queryClient.invalidateQueries({ queryKey: ["scenes", chapterId] });
      }
    },
  });
}

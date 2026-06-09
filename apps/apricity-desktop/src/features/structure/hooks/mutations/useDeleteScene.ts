import { deleteScene } from "@/features/structure";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteScene(chapterId?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteScene,
    onSuccess: () => {
      if (chapterId) {
        queryClient.invalidateQueries({ queryKey: ["scenes", chapterId] });
      }
    },
  });
}

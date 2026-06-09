import { deleteChapter } from "@/features/structure";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteChapter(storyId?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteChapter,
    onSuccess: () => {
      if (storyId) {
        queryClient.invalidateQueries({ queryKey: ["chapters", storyId] });
      }
    },
  });
}

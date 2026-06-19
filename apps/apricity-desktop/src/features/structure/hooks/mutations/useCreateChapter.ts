import { createChapter } from "@/features/structure";
import { queryKeys } from "@/features/structure/lib/querykeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateChapter(storyId: string | null) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createChapter,
    onSuccess: () => {
      if (!storyId) return;
      queryClient.invalidateQueries({
        queryKey: queryKeys.structure.chapters.list(storyId),
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

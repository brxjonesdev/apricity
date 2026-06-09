import { addStory } from "@/features/library";
import { queryKeys } from "@/lib/querykeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateStory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addStory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.library.list(),
      });
    },
    onError: (error) => {
      console.error("Failed to create story:", error);
    },
  });
}

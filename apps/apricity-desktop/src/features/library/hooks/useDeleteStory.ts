import { deleteStory } from "@/features/library";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteStory(storyId?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStory,
    onSuccess: () => null,
  });
}

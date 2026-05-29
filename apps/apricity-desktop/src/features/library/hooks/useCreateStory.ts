import { addStory } from "@/features/library";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateStory(storyId?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addStory,
    onSuccess: () => null,
  });
}

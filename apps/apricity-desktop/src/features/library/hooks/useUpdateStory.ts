import { updateStory } from "@/features/library";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateStory(storyId?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStory,
    onSuccess: () => null,
  });
}

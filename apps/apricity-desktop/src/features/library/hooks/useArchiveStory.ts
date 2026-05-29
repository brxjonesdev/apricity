import { archiveStory } from "@/features/library";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useArchiveStory(storyId?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: archiveStory,
    onSuccess: () => null,
  });
}

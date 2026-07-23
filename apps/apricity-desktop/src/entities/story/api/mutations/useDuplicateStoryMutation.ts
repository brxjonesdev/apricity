import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duplicateStory } from "../commands";
import { storyQueries } from "../querykeys";

export default function useDuplicateStoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storyId, index }: { storyId: string, index: number }) => duplicateStory({ storyId, index }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: storyQueries.lists()
      })
    }
  })
}
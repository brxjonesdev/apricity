import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStory } from "../commands";
import { storyQueries } from "../querykeys";

export function useDeleteStoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ storyId }: { storyId: string }) => deleteStory({ storyId }),
    onSuccess: (_, { storyId }) => {
      console.log('delete succeeded for', storyId);   // add this
      queryClient.removeQueries({ queryKey: storyQueries.detail(storyId) });
      queryClient.invalidateQueries({ queryKey: storyQueries.all });
    },
    onError: (error) => {
      console.log('delete failed:', error);   // add this
    },
  });
}
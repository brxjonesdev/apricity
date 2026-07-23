import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStory } from "../commands";
import { storyQueries } from "../querykeys";

export default function useDeleteStoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storyId }: { storyId: string }) => deleteStory({ storyId }),
    onSuccess: (_, { storyId }) => {
      queryClient.removeQueries({
          queryKey: storyQueries.detail(storyId),
        });
      
        queryClient.invalidateQueries({
          queryKey: storyQueries.lists(),
        });
    }
  })
}
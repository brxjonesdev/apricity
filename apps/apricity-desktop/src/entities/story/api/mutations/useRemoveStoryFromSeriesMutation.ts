import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeStoryFromSeries } from "../commands";
import { storyQueries } from "../querykeys";

export default function useRemoveStoryFromSeries() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storyId }: { storyId: string }) => removeStoryFromSeries({ storyId }),
    onSuccess: (_, { storyId }) => {
      queryClient.invalidateQueries({
        queryKey: storyQueries.detail(storyId)
      })    
    }
  })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeStoryFromSeries } from "../commands";
import { storyQueries } from "../querykeys";

export function useRemoveStoryFromSeriesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storyId }: { storyId: string }) => {
      return removeStoryFromSeries({ storyId });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
      queryKey: storyQueries.all
      })
    },
  });
}
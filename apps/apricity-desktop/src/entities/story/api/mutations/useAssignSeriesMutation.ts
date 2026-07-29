import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignStoryToSeries } from "../commands";
import { storyQueries } from "../querykeys";


export function useAssignSeriesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storyId, seriesId }: { storyId: string; seriesId: string }) => assignStoryToSeries({ storyId, seriesId }),
    onSuccess: (_, { storyId, seriesId }) => {
      queryClient.invalidateQueries({
      queryKey: storyQueries.bySeries(seriesId)
      })

      queryClient.invalidateQueries({
        queryKey: storyQueries.detail(storyId)
      })
    }
  })
}
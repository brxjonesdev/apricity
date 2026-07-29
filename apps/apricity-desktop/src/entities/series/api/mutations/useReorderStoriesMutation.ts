import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reorderStoriesInSeries } from "../commands/reorder-stories";
import { seriesQueries } from "../querykeys";

export function useReorderStoriesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ seriesId, storyIds }: { seriesId: string, storyIds: string[] }) => reorderStoriesInSeries(seriesId, storyIds),
    onSuccess: (_, { seriesId }) => {
      queryClient.invalidateQueries({
        queryKey: seriesQueries.detail(seriesId)
      })
      queryClient.invalidateQueries({
        queryKey: seriesQueries.lists()
      })
    }
  })
}
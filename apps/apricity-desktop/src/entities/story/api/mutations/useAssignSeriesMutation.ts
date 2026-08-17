import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignStoryToSeries } from "../commands";
import { storyQueries } from "../querykeys";
import { StoryDetails } from "../../types";
import { computeOrderKey } from "@/shared/ordering/computeOrder";


export function useAssignSeriesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storyId, seriesId }: { storyId: string; seriesId: string }) => {
      const stories =
        queryClient.getQueryData<StoryDetails[]>(
          storyQueries.bySeries(seriesId)
        ) ?? [];

      const order = computeOrderKey(stories, "end", (story) => story.storyId);

      return assignStoryToSeries({
        storyId,
        seriesId,
        order
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
      queryKey: storyQueries.all
      })
    }
  })
}
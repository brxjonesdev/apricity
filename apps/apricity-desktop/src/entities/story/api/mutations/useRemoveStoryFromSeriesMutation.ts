import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeStoryFromSeries } from "../commands";
import { storyQueries } from "../querykeys";
import { Story } from "../../types";

export function useRemoveStoryFromSeriesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storyId }: { storyId: string; seriesId: string }) => {
      return removeStoryFromSeries({ storyId });
    },
    onMutate: async ({ storyId, seriesId }) => {
      await queryClient.cancelQueries({
        queryKey: storyQueries.all,
      });

      const prevStories = queryClient.getQueryData<Story[]>(storyQueries.all);

      if (!prevStories) {
        throw new Error('stories are not loaded');
      }

      queryClient.setQueryData<Story[]>(
        storyQueries.all,
        prevStories.map((story) =>
          story.storyId === storyId ? { ...story, seriesId: null } : story,
        ),
      );
      return { prevStories };
    },
    onError: (_error, _vars, context) => {
      if (context?.prevStories) {
        queryClient.setQueryData(storyQueries.all, context.prevStories);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: storyQueries.all,
      });
    },
  });
}

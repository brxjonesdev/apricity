import { useMutation, useQueryClient } from "@tanstack/react-query";
import { restoreStory } from "../commands";
import { storyQueries } from "../querykeys";
import { Story } from "../../types";

export function useRestoreStoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storyId }: { storyId: string }) => restoreStory({ storyId }),
    onMutate: async ({storyId}) => {
      await queryClient.cancelQueries({
        queryKey: storyQueries.all
      })

      const prevCache = queryClient.getQueryData<Story[]>(storyQueries.all);
      if (!prevCache) {
        throw new Error("Stories are not loaded")
      }

      const story = prevCache.find((story) => story.storyId === storyId);
      if (!story) {
        throw new Error("Target story is not found");
      }
      const optimisticChange: Story = {
        ...story,
        isArchived: false
      };

      // update the story with matching storyID in the cache.
       queryClient.setQueryData<Story[]>(
          storyQueries.all,
          prevCache.map((story) =>
            story.storyId === storyId
              ? optimisticChange
              : story
          )
        );

       return {prevCache}
    },
    onError: (_error, _vars, context) => {
      if (!context) return;

      queryClient.setQueryData(storyQueries.all, context.prevCache)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: storyQueries.all,
      });
    }
  })
}
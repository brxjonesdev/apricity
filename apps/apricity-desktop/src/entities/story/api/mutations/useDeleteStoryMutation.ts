import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStory } from "../commands";
import { storyQueries } from "../querykeys";
import { Story } from "../../types";

export function useDeleteStoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ storyId }: { storyId: string }) => deleteStory({ storyId }),
    onMutate: async ({ storyId }) => {
      await queryClient.cancelQueries({
        queryKey: storyQueries.all
      });

      const prevStories = queryClient.getQueryData<Story[]>(storyQueries.all);
      if (!prevStories) {
        throw new Error("Stories aren't loaded..")
      }
      const updatedStories = prevStories.filter((story) => story.storyId !== storyId)

      queryClient.setQueryData(storyQueries.all, updatedStories);

      return {
        prevStories
      }
    },
    onError: (_, __, context) => {
      if (!context) return;

      queryClient.setQueryData(storyQueries.all, context.prevStories);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: storyQueries.all
      })
    }
  });
}
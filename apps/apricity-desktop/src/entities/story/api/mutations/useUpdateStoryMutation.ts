import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStory } from "../commands";
import { UpdateStoryDTO } from "../dto/update-story.dto";
import { storyQueries } from "../querykeys";
import { Story } from "../../types";

export function useUpdateStoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ update }: { update: UpdateStoryDTO }) => updateStory({ update }),

    onMutate: async ({ update }) => {
      await queryClient.cancelQueries({ queryKey: storyQueries.all });
      await queryClient.cancelQueries({ queryKey: storyQueries.detail(update.id) });

      const previousStories = queryClient.getQueryData<Story[]>(storyQueries.all);
      const previousStory = queryClient.getQueryData<Story>(storyQueries.detail(update.id));


      queryClient.setQueryData<Story[]>(storyQueries.all, (old) =>
        old?.map((story) =>
          story.storyId === update.id
            ? { ...story, seriesId: update.series_id !== undefined ? update.series_id : story.seriesId }
            : story
        )
      );

      queryClient.setQueryData<Story>(storyQueries.detail(update.id), (old) =>
        old
          ? { ...old, seriesId: update.series_id !== undefined ? update.series_id : old.seriesId }
          : old
      );

      return { previousStories, previousStory };
    },

    onSuccess: (_, { update }) => {
      queryClient.invalidateQueries({ queryKey: storyQueries.detail(update.id) });
      queryClient.invalidateQueries({ queryKey: storyQueries.all });
    },

    onError: (error, { update }, context) => {
      console.log("Update Failed", error);

      if (context?.previousStories) {
        queryClient.setQueryData(storyQueries.all, context.previousStories);
      }
      if (context?.previousStory) {
        queryClient.setQueryData(storyQueries.detail(update.id), context.previousStory);
      }
    },
  });
}
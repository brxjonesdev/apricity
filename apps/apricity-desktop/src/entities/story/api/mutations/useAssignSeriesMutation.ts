import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignStoryToSeries } from "../commands";
import { storyQueries } from "../querykeys";
import { Story, StoryInSeries } from "../../types";
import { computeOrderKey } from "@/shared/ordering/computeOrder";

type AssignSeriesVariables = {
  storyId: string;
  seriesId: string;
};


export function useAssignSeriesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      storyId,
      seriesId,
    }: AssignSeriesVariables) => {
      const currentSeriesStories = queryClient.getQueryData<StoryInSeries[]>(
        storyQueries.bySeries(seriesId)
      );

      if (!currentSeriesStories) {
        throw new Error("Stories for this series are not loaded");
      }

      const order = computeOrderKey(
        currentSeriesStories,
        "end",
        (story) => story.storyId
      );

      return assignStoryToSeries({
        storyId,
        seriesId,
        order,
      });
    },

    onMutate: async ({ storyId, seriesId }) => {
      await queryClient.cancelQueries({
        queryKey: storyQueries.all,
      });

      const prevStories = queryClient.getQueryData<Story[]>(
        storyQueries.all
      );

      if (!prevStories) {
        throw new Error("Stories aren't loaded");
      }

      const story = prevStories.find(
        (story) => story.storyId === storyId
      );

      if (!story) {
        throw new Error("Story not found");
      }

      // check if current story is already in a series
      const sourceSeriesId = story.seriesId;
      
      // get all stories in the current stories series if there is a current story
      const prevSourceSeriesStories = sourceSeriesId
        ? queryClient.getQueryData<StoryInSeries[]>(
            storyQueries.bySeries(sourceSeriesId)
          )
        : undefined;

      
      // get destinations series stories
      const prevDestinationSeriesStories =
        queryClient.getQueryData<StoryInSeries[]>(
          storyQueries.bySeries(seriesId)
        );

      const order = computeOrderKey(
        prevDestinationSeriesStories ?? [],
        "end",
        (story) => story.storyId
      );

      const optimisticStory: StoryInSeries = {
        ...story,
        seriesId,
        order,
      };

      // Update all stories
      queryClient.setQueryData<Story[]>(
        storyQueries.all,
        (old = []) =>
          old.map((story) =>
            story.storyId === storyId
              ? {
                  ...story,
                  seriesId,
                }
              : story
          )
      );

      // Remove from old series
      if (sourceSeriesId) {
        queryClient.setQueryData<StoryInSeries[]>(
          storyQueries.bySeries(sourceSeriesId),
          (old = []) =>
            old.filter(
              (story) => story.storyId !== storyId
            )
        );
      }

      // Add to new series
      queryClient.setQueryData<StoryInSeries[]>(
        storyQueries.bySeries(seriesId),
        (old = []) => [...old, optimisticStory]
      );

      return {
        prevStories,
        prevSourceSeriesStories,
        prevDestinationSeriesStories,
        sourceSeriesId,
      };
    },

    onError: (
      _error,
      { seriesId },
      context
    ) => {
      if (!context) return;

      queryClient.setQueryData(
        storyQueries.all,
        context.prevStories
      );

      if (context.sourceSeriesId) {
        queryClient.setQueryData(
          storyQueries.bySeries(context.sourceSeriesId),
          context.prevSourceSeriesStories
        );
      }

      queryClient.setQueryData(
        storyQueries.bySeries(seriesId),
        context.prevDestinationSeriesStories
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: storyQueries.all,
      });
    },
  });
}
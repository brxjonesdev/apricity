import { useMutation, useQueryClient } from "@tanstack/react-query";
import { archiveStory } from "../commands";
import { storyQueries } from "../querykeys";
import { Story } from "../../types";

export function useArchiveStoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storyId }: { storyId: string }) => archiveStory({ storyId }),
    onMutate: async ({ storyId }) => {
      await queryClient.cancelQueries({ queryKey: storyQueries.all });
      const previousStories = queryClient.getQueryData<Story[]>(storyQueries.all);
      queryClient.setQueryData<Story[]>(storyQueries.all, (oldStories) => {
        if (!oldStories) return oldStories;

        return oldStories.map((story) =>
          story.storyId === storyId
            ? {
                ...story,
                isArchived: true,
              }
            : story,
        );
      });

      return previousStories;
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(
        storyQueries.all,
        context,
      );
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: storyQueries.all,
      });
    },
  });
}

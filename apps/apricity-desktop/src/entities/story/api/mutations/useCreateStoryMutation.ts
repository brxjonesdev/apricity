import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStory } from "../commands";
import { CreateStoryDTO } from "../dto/create-story.dto";
import { storyQueries } from "../querykeys";
import { useActiveStory } from "@/app/layouts/contexts/active-story.context";
import { Story } from "../../types";

export function useCreateStoryMutation() {
  const queryClient = useQueryClient();
  const {setActiveStoryId} = useActiveStory();
  return useMutation({
    mutationFn: (input: CreateStoryDTO) => createStory(input),
    onMutate: async (input) => {
      await queryClient.cancelQueries({
        queryKey: storyQueries.all
      });

      const prevStories = queryClient.getQueryData<Story[]>(storyQueries.all)
      if (!prevStories) {
        throw new Error("Stories aren't loaded")
      }
      const tempID = crypto.randomUUID()
      const optimisticStory: Story = {
        ...input,
        order: null,
        storyId: tempID,
        lastUpdated: new Date(),
        isArchived: false,
        seriesId: null,
        synopsis: input.synopsis || "",
        coverImage: input.coverImage || ""
      }

      queryClient.setQueryData<Story[]>(storyQueries.all, (oldStories = []) => [...oldStories, optimisticStory]);
      setActiveStoryId(tempID)
      return {
        prevStories
      }

    
    },
    onError: async (_, __, context) => {
      if (!context) return;
      queryClient.setQueryData(storyQueries.all, context.prevStories)
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: storyQueries.all
      })

      setActiveStoryId(data?.storyId)
    }
  })
}
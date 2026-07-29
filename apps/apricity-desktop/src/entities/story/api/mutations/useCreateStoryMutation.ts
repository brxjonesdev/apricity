import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStory } from "../commands";
import { CreateStoryDTO } from "../dto/create-story.dto";
import { storyQueries } from "../querykeys";

export function useCreateStoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateStoryDTO) => createStory(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: storyQueries.lists(),
      });
    }
  })
}
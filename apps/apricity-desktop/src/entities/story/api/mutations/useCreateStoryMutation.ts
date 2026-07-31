import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStory } from "../commands";
import { CreateStoryDTO } from "../dto/create-story.dto";
import { storyQueries } from "../querykeys";
import { useActiveStory } from "@/app/layouts/contexts/active-story.context";

export function useCreateStoryMutation() {
  const queryClient = useQueryClient();
  const {setActiveStoryId} = useActiveStory()

  return useMutation({
    mutationFn: (input: CreateStoryDTO) => createStory(input),
    onSuccess: (data) => {
      queryClient.setQueryData(
        storyQueries.detail(data.storyId),
        data
      );
    
      queryClient.invalidateQueries({
        queryKey: storyQueries.all,
      });
    
      setActiveStoryId(data.storyId);
    }
  })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStory } from "../commands";
import { UpdateStoryDTO } from "../dto/update-story.dto";
import { storyQueries } from "../querykeys";

export function useUpdateStoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ update }: { update: UpdateStoryDTO }) => updateStory({ update }),
    onSuccess: (_, { update }) => {
      queryClient.invalidateQueries({ queryKey: storyQueries.detail(update.id) });
           queryClient.invalidateQueries({ queryKey: storyQueries.all });
    },
    onError: (error) => {
      console.log("Update Failed", error)
    }
  })
}
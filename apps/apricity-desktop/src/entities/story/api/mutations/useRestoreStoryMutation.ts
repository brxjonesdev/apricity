import { useMutation, useQueryClient } from "@tanstack/react-query";
import { restoreStory } from "../commands";
import { storyQueries } from "../querykeys";

export default function useRestoreStoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storyId }: { storyId: string }) => restoreStory({ storyId }),
    onSuccess: (_, {storyId}) => {
      queryClient.invalidateQueries(({
        queryKey: storyQueries.detail(storyId)
      }))

      queryClient.invalidateQueries({
        queryKey: storyQueries.lists()
      })
    }
  })
}
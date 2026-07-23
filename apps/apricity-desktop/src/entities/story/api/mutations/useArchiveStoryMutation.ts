import { useMutation, useQueryClient } from "@tanstack/react-query";
import { archiveStory } from "../commands";
import { storyQueries } from "../querykeys";

export default function useArchiveStoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storyId }: { storyId: string }) => archiveStory({ storyId }),
    onSuccess: (_, {storyId}) => {
      queryClient.invalidateQueries({
        queryKey: storyQueries.detail(storyId)
      })

      queryClient.invalidateQueries(({
        queryKey: storyQueries.all
      }))
    }
  })
}
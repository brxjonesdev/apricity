import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteChapter } from "../commands/delete-chapter";
import { chapterQueries } from "../querykeys";

export function useDeleteChapterMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ chapterId }: { chapterId: string }) => deleteChapter(chapterId),
    onSuccess: (_, { chapterId }) => {
      queryClient.removeQueries({
        queryKey: chapterQueries.detail(chapterId)
      })
      queryClient.invalidateQueries({
        queryKey: chapterQueries.lists()
      })
    }
  })
}
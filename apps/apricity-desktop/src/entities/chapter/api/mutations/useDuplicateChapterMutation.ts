import { useMutation, useQueryClient } from "@tanstack/react-query";
import { chapterQueries } from "../querykeys";
import { duplicateChapter } from "../commands/duplicate-chapter";

export default function useDuplicateChapterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      chapterId,
      index
    }: {
        chapterId: string;
        index: number
    }) => duplicateChapter(chapterId, index),

    onSuccess: (newChapter) => {
      queryClient.invalidateQueries({
        queryKey: chapterQueries.byStory(newChapter.storyId),
      });
    },
  });
}
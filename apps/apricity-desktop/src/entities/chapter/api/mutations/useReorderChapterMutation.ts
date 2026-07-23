import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reorderChapter } from "../commands/reorder-chapter";
import { chapterQueries } from "../querykeys";

export default function useReorderChapterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      storyId,
      chapterIds,
    }: {
      storyId: string;
      chapterIds: string[];
    }) => reorderChapter(storyId, chapterIds),

    onSuccess: (_, { storyId }) => {
      queryClient.invalidateQueries({
        queryKey: chapterQueries.byStory(storyId),
      });
    },
  });
}
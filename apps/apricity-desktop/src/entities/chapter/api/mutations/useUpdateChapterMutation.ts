import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateChapter } from "../commands/update-chapter";
import { UpdateChapterDTO } from "../dto/update-chapter.dto";
import { chapterQueries } from "../querykeys";

export default function useUpdateChapterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ updates }: { updates: UpdateChapterDTO }) =>
      updateChapter(updates),

    onSuccess: (updatedChapter) => {
      queryClient.invalidateQueries({
        queryKey: chapterQueries.detail(updatedChapter.id),
      });

      queryClient.invalidateQueries({
        queryKey: chapterQueries.byStory(updatedChapter.storyId),
      });
    },
  });
}
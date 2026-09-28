import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateChapter } from "../commands/update-chapter";
import { UpdateChapterDTO } from "../dto/update-chapter.dto";
import { chapterQueries } from "../querykeys";

export function useUpdateChapterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ updates }: { updates: UpdateChapterDTO }) =>
      updateChapter(updates),

    onSuccess: async (updatedChapter) => {
      console.log("✅ UPDATED CHAPTER:", updatedChapter);

      await queryClient.invalidateQueries({
        queryKey: chapterQueries.byStory(updatedChapter.storyId),
      });

      console.log("🔄 CHAPTER QUERY INVALIDATED");
    },
  });
}
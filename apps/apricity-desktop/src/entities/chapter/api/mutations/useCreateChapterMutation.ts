import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChapter } from "../commands/create-chapter";
import { CreateChapterDTO } from "../dto/create-chapter.dto";
import { chapterQueries } from "../querykeys";

export function useCreateChapterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ input }: { input: CreateChapterDTO }) => createChapter(input),
    onSuccess: (_, {input}) => {
      queryClient.invalidateQueries({
        queryKey: chapterQueries.byStory(input.story_id)
      })
      queryClient.invalidateQueries({
        queryKey: chapterQueries.all
      })
    }
  })
}
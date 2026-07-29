import { useQuery } from "@tanstack/react-query";
import { chapterQueries } from "../querykeys";
import { getChaptersByStoryId } from "../commands/get-chapter-by-story";

export function useChaptersByStoryQuery(storyId?: string) {
  return useQuery({
    queryKey: chapterQueries.byStory(storyId!),
    queryFn: () => getChaptersByStoryId(storyId!),
    enabled: !!storyId
  })
}
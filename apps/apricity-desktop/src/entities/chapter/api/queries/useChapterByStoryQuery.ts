import { useQuery } from "@tanstack/react-query";
import { chapterQueries } from "../querykeys";
import { getChaptersByStoryId } from "../commands/get-chapter-by-story";

export default function useChapterByStoryQuery(storyId: string) {
  return useQuery({
    queryKey: chapterQueries.byStory(storyId),
    queryFn: () => getChaptersByStoryId(storyId),
    enabled: !!storyId
  })
}
import { useQuery } from "@tanstack/react-query"
import { chapterQueries } from "../querykeys"
import { getChapterById } from "../commands/get-chapter-by-id"
export default function useChapterDetailQuery(chapterId: string) {
  return useQuery({
    queryKey: chapterQueries.detail(chapterId),
    queryFn: () => getChapterById(chapterId),
    enabled: !!chapterId
  })
}
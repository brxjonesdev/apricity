import { useQuery } from "@tanstack/react-query";
import { storyQueries } from "../querykeys";
import { getStoryDetailsById } from "../commands/get-detail-story";

export default function useStoryDetailQuery(storyId: string) {
  return useQuery({
    queryKey: storyQueries.detail(storyId),
    queryFn: () => getStoryDetailsById(storyId),
    enabled: !!storyId
  })
}
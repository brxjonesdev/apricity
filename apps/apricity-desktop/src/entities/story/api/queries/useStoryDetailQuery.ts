import { useQuery } from "@tanstack/react-query";
import { storyQueries } from "../querykeys";
import { getStoryById } from "../commands/get-story";

export function useStoryQuery(storyId: string) {
  return useQuery({
    queryKey: storyQueries.detail(storyId),
    queryFn: () => getStoryById(storyId),
    enabled: !!storyId
  })
}
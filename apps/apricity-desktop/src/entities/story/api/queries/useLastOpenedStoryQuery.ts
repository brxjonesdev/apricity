import { useQuery } from "@tanstack/react-query";
import { storyQueries } from "../querykeys";
import { getLastOpenedStory } from "../commands/get-last-opened";

export function useLastOpenedStoryQuery() {
  return useQuery({
    queryKey: storyQueries.lastOpened,
    queryFn: () => getLastOpenedStory(),
  })
}
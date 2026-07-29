import { useQuery } from "@tanstack/react-query";
import { storyQueries } from "../querykeys";
import { getStories } from "../commands/get-stories";

export function useStoriesQuery() {
  return useQuery({
    queryKey: storyQueries.all,
    queryFn:() => getStories(),
  })
}
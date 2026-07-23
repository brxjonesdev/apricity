import { useQuery } from "@tanstack/react-query";
import { storyQueries } from "../querykeys";

export default function useStoriesQuery() {
  return useQuery({
    queryKey: storyQueries.
  })
}
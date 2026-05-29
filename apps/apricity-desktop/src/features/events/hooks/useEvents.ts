import { useQuery } from "@tanstack/react-query";
import { getAllEvents } from "..";

export function useEvents(storyId?: string | null) {
  return useQuery({
    queryKey: ["events", storyId],
    queryFn: () => getAllEvents(storyId as string),
    enabled: !!storyId,
  });
}

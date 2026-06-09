import { useQuery } from "@tanstack/react-query";
import { getAllEvents } from "..";
import { queryKeys } from "@/lib/querykeys";

export function useEvents(storyId?: string | null) {
  return useQuery({
    queryKey: queryKeys.events.list(storyId ?? ""),
    queryFn: () => getAllEvents(storyId as string),
    enabled: !!storyId,
  });
}

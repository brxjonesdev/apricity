import { useQuery } from "@tanstack/react-query";
import { getEventById } from "@/features/events";
import { queryKeys } from "@/features/structure/lib/querykeys";

export function useEvent(eventId?: string | null) {
  return useQuery({
    queryKey: queryKeys.events.detail(eventId ?? ""),
    queryFn: () => {
      if (!eventId) throw new Error("Missing eventId");
      return getEventById(eventId);
    },
    enabled: !!eventId,
  });
}

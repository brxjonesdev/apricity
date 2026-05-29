import { useQuery } from "@tanstack/react-query";
import { getEventById } from "@/features/events";

export function useEvent(eventId?: string | null) {
  return useQuery({
    queryKey: ["events", eventId],
    queryFn: () => {
      if (!eventId) throw new Error("Missing eventId");
      return getEventById(eventId);
    },
    enabled: !!eventId,
  });
}

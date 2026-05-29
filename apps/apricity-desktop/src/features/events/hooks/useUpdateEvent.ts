import { updateEvent } from "@/features/events";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateEvents(storyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      // invalidate all keys that rely on events. like the list of events
    },
  });
}

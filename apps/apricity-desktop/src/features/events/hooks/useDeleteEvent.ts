import { deleteEvent } from "@/features/events";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteEvent(storyId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => null,
  });
}

import { createEvent } from "@/features/events";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateEvent(storyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEvent,
    onSuccess: () => null,
  });
}

import { createLocation } from "@/features/locations";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateLocation(storyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLocation,
    onSuccess: () => {},
  });
}

import { updateLocation } from "@/features/locations";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateCharacter(storyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLocation,
    onSuccess: () => {},
  });
}

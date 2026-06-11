import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLocation } from "@/features/locations";

export function useDeleteCharacter(storyId?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLocation,
    onSuccess: () => null,
  });
}

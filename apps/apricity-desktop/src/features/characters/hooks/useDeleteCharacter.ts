import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCharacter } from "@/features/characters";

export function useDeleteCharacter(storyId?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCharacter,
    onSuccess: () => null,
  });
}

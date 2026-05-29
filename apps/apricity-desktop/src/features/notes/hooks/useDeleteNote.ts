import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/features/notes";

export function useDeleteCharacter(storyId?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNote,
    onSuccess: () => null,
  });
}

import { updateNote } from "@/features/notes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/features/structure/lib/querykeys";

export function useUpdateNote(noteId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.notes.detail(noteId),
      });
    },
  });
}

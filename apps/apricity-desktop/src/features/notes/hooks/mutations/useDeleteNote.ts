import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/features/notes";
import { queryKeys } from "@/features/structure/lib/querykeys";

export function useDeleteCharacter(storyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.notes.list(storyId),
      });
    },
  });
}

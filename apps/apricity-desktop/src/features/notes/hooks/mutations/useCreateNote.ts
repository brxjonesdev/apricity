import { createNote } from "@/features/notes";
import { queryKeys } from "@/features/structure/lib/querykeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateNote(storyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.notes.list(storyId),
      });
    },
  });
}

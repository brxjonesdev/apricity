import { updateNote } from "@/features/notes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateNote(storyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      // invalidate all keys that rely on characters. like the list of characters
    },
  });
}

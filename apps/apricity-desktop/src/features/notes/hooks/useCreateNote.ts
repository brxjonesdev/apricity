import { createNote } from "@/features/notes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateNote(storyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,
    onSuccess: () => {},
  });
}

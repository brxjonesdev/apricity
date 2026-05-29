import { updateCharacter } from "@/features/characters";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateCharacter(storyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCharacter,
    onSuccess: () => {
      // invalidate all keys that rely on characters. like the list of characters
    },
  });
}

import { createCharacter } from "@/features/characters";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCharacter(storyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCharacter,
    onSuccess: () => {},
  });
}

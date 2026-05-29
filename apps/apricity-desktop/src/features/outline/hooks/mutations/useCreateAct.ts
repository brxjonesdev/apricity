import { createAct } from "@/features/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateAct(storyId?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAct,
    onSuccess: () => {},
  });
}

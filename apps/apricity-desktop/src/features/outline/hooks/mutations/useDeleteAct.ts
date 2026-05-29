import { deleteAct } from "@/features/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteAct(storyId?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAct,
    onSuccess: () => null,
  });
}

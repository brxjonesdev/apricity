import { updateAct } from "@/features/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateActPayload = {
  id: string;
  updates: any;
};

export function useUpdateAct(storyId?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateActPayload) =>
      updateAct(payload.id, payload.updates),
    onSuccess: () => null,
  });
}

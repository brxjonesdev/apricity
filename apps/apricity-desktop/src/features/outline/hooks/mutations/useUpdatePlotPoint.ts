import { updatePlotPoint } from "@/features/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdatePlotPointPayload = {
  id: string;
  updates: any;
};

export function useUpdatePlotPoint(storyId?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePlotPointPayload) =>
      updatePlotPoint(payload.id, payload.updates),
    onSuccess: () => null,
  });
}

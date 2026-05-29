import { createPlotPoint } from "@/features/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePlotPoint(storyId?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPlotPoint,
    onSuccess: () => null,
  });
}

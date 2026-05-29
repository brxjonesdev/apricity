import { deletePlotPoint } from "@/features/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePlotPoint(storyId?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlotPoint,
    onSuccess: () => null,
  });
}

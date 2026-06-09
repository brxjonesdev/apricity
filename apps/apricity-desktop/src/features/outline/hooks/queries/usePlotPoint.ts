import { useQuery } from "@tanstack/react-query";
import { getPlotPointById } from "@/features/outline";
import { queryKeys } from "@/lib/querykeys";

export function usePlotPoint(plotId?: string | null) {
  return useQuery({
    queryKey: queryKeys.outline.plotPoints.detail(plotId ?? ""),
    queryFn: () => {
      if (!plotId) throw new Error("Missing plot point id");
      return getPlotPointById(plotId);
    },
    enabled: !!plotId,
  });
}

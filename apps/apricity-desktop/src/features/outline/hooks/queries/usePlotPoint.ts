import { useQuery } from "@tanstack/react-query";
import { getPlotPointById } from "@/features/outline";

export function usePlotPoint(plotId?: string | null) {
  return useQuery({
    queryKey: ["plot_points", plotId],
    queryFn: () => {
      if (!plotId) throw new Error("Missing plot point id");
      return getPlotPointById(plotId);
    },
    enabled: !!plotId,
  });
}

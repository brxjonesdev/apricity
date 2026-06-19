import { useQuery } from "@tanstack/react-query";
import { getAllPlotPoints } from "@/features/outline";
import { queryKeys } from "@/features/structure/lib/querykeys";

export function usePlotPoints(storyId?: string | null) {
  return useQuery({
    queryKey: queryKeys.outline.plotPoints.list(storyId ?? ""),
    queryFn: () => getAllPlotPoints(storyId as string),
    enabled: !!storyId,
  });
}

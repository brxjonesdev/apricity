import { useQuery } from "@tanstack/react-query";
import { getAllPlotPoints } from "@/features/outline";

export function usePlotPoints(storyId?: string | null) {
  return useQuery({
    queryKey: ["plot_points", storyId],
    queryFn: () => getAllPlotPoints(storyId as string),
    enabled: !!storyId,
  });
}

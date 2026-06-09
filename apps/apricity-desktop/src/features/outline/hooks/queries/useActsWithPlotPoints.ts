import { useQueries } from "@tanstack/react-query";
import { queryKeys } from "@/lib/querykeys";
import { UseQueryOptions } from "@tanstack/react-query";
import { Result } from "@/shared/types";
import { useActs } from "./useActs";
import { getActPlotPoints } from "../../actions";
import { PlotPoint } from "../../types";

export function useActsWithPlotPoints(storyId?: string | null) {
  const { data: actsResult, isLoading: actsLoading } = useActs(storyId);
  const acts = actsResult ?? [];

  const plotQueries = useQueries({
    queries: acts.map(
      (act): UseQueryOptions<Result<PlotPoint[]>, Error, PlotPoint[]> => ({
        queryKey: queryKeys.outline.plotPoints.list(act.id),
        queryFn: () => getActPlotPoints(act.id),
        enabled: !!storyId && act.id !== undefined,
        select: (result) => {
          if (result.ok) return result.data;
          return [];
        },
      }),
    ),
  });

  const actsWithPlotPoints = acts.map((act, index) => ({
    ...act,
    plotPoints: plotQueries[index].data as PlotPoint[],
  }));

  const plotPointsLoading = plotQueries.some((query) => query.isLoading);

  return {
    data: { acts: actsWithPlotPoints },
    isLoading: actsLoading || plotPointsLoading,
  };
}

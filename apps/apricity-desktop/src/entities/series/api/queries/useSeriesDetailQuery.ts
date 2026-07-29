import { useQuery } from "@tanstack/react-query";
import { seriesQueries } from "../querykeys";
import { getSeriesById } from "../commands/get-series-by-id";

export function useSeriesDetailQuery(seriesId: string) {
  return useQuery({
    queryKey: seriesQueries.detail(seriesId),
    queryFn: () => getSeriesById(seriesId),
    enabled: !!seriesId,
    
  })
}
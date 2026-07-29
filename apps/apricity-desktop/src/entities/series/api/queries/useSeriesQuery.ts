import { useQuery } from "@tanstack/react-query";
import { seriesQueries } from "../querykeys";
import { getAllSeries } from "../commands/get-series";

export function useSeriesQuery() {
  return useQuery({
    queryKey: seriesQueries.all,
    queryFn: () => getAllSeries(),  
  })
}
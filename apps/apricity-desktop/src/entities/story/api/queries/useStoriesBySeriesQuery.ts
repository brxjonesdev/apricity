import { useQuery } from "@tanstack/react-query";
import { storyQueries } from "../querykeys";
import { getStoriesBySeriesId } from "../commands/get-stories-by-series";

export default function useStoriesBySeriesQuery(seriesId: string) {
  return useQuery({
    queryKey: storyQueries.bySeries(seriesId),
    queryFn: () => getStoriesBySeriesId({ seriesId }),
    enabled: !!seriesId
  })
}
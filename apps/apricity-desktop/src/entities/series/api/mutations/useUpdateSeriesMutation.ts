import { useMutation, useQueryClient } from "@tanstack/react-query";
import { seriesQueries } from "../querykeys";
import { updateSeries } from "../commands/update-series";
import { UpdateSeriesDTO } from "../dto/series.dto";

export default function useUpdateSeriesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({updates, seriesId}: {updates: UpdateSeriesDTO, seriesId: string}) => updateSeries(updates, seriesId),
    onSuccess: (_, { seriesId }) => {
      queryClient.invalidateQueries({
        queryKey: seriesQueries.detail(seriesId)
      })
    }
  })
}
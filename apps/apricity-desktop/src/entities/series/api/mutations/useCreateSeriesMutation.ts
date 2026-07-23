import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSeries } from "../commands/create-series";
import { CreateSeriesDTO } from "../dto/series.dto";
import { seriesQueries } from "../querykeys";

export default function useCreateSeriesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateSeriesDTO) => createSeries(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: seriesQueries.lists()
      })
    }
  })
}
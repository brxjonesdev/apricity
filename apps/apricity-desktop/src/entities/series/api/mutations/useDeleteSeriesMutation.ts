import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSeries } from "../commands/delete-series";
import { seriesQueries } from "../querykeys";

export default function useDeleteSeriesMutation() {
  const queryClient = useQueryClient();
 
  return useMutation({
    mutationFn: (seriesId: string) => deleteSeries(seriesId),
    onSuccess: (_, seriesId) => {
      queryClient.removeQueries({queryKey: seriesQueries.detail(seriesId)})
      queryClient.invalidateQueries({queryKey: seriesQueries.lists()})
    }
 }) 
}
import { useQuery } from "@tanstack/react-query";
import { getUserLibrary } from "@/features/library";
import { queryKeys } from "@/lib/querykeys";

export function useStories() {
  return useQuery({
    queryKey: queryKeys.library.list(),
    queryFn: getUserLibrary,
    select: (result) => {
      if (result.ok) {
        return result.data;
      }
      throw new Error(result.error);
    },
  });
}

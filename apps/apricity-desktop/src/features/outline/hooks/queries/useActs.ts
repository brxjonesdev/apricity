import { useQuery } from "@tanstack/react-query";
import { getAllActs } from "@/features/outline";
import { queryKeys } from "@/features/structure/lib/querykeys";
export function useActs(storyId?: string | null) {
  return useQuery({
    queryKey: queryKeys.outline.acts.list(storyId ?? ""),
    queryFn: () => getAllActs(storyId as string),
    enabled: !!storyId,
    select: (result) => {
      if (result.ok) {
        return result.data;
      }
      throw new Error(result.error);
    },
  });
}

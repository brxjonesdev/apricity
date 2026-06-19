import { useQuery } from "@tanstack/react-query";
import { getAllChapters } from "@/features/structure";
import { queryKeys } from "@/features/structure/lib/querykeys";

export function useChapters(storyId?: string | null) {
  return useQuery({
    queryKey: queryKeys.structure.chapters.list(storyId ?? ""),
    queryFn: () => getAllChapters(storyId as string),
    enabled: !!storyId,
    select: (result) => {
      if (result.ok) {
        return result.data;
      }
      throw new Error(result.error);
    },
  });
}

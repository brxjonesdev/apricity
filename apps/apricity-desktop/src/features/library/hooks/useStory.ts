import { useQuery } from "@tanstack/react-query";
import { getStoryById } from "@/features/library";
import { queryKeys } from "@/lib/querykeys";

export function useStory(storyId?: string | null) {
  return useQuery({
    queryKey: queryKeys.library.detail(storyId ?? ""),
    queryFn: () => getStoryById(storyId as string),
    enabled: !!storyId,
    select: (result) => {
      if (result.ok) {
        return result.data;
      }
      return null;
    },
  });
}

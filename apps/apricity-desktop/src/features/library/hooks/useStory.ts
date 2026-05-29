import { useQuery } from "@tanstack/react-query";
import { getStoryById } from "@/features/library";

export function useStory(storyId?: string | null) {
  return useQuery({
    queryKey: ["story", storyId],
    queryFn: () => getStoryById(storyId as string),
    enabled: !!storyId,
  });
}

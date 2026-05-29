import { useQuery } from "@tanstack/react-query";
import { getAllActs } from "@/features/outline";
export function useActs(storyId?: string | null) {
  return useQuery({
    queryKey: ["acts", storyId],
    queryFn: () => getAllActs(storyId as string),
    enabled: !!storyId,
  });
}

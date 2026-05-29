import { useQuery } from "@tanstack/react-query";
import { getAllLocations } from "@/features/locations";

export function useLocations(storyId?: string | null) {
  return useQuery({
    queryKey: ["locations", storyId],
    queryFn: () => getAllLocations(storyId as string),
    enabled: !!storyId,
  });
}

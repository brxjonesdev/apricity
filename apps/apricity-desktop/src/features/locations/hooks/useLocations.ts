import { useQuery } from "@tanstack/react-query";
import { getAllLocations } from "@/features/locations";
import { queryKeys } from "@/features/structure/lib/querykeys";

export function useLocations(storyId?: string | null) {
  return useQuery({
    queryKey: queryKeys.locations.list(storyId ?? ""),
    queryFn: () => getAllLocations(storyId as string),
    enabled: !!storyId,
  });
}

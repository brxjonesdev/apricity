import { useQuery } from "@tanstack/react-query";
import { getLocationByID } from "@/features/locations";
import { queryKeys } from "@/features/structure/lib/querykeys";

export function useLocation(locationId?: string | null) {
  return useQuery({
    queryKey: queryKeys.locations.detail(locationId ?? ""),
    queryFn: () => {
      if (!locationId) throw new Error("Missing loactionId");
      return getLocationByID(locationId);
    },
    enabled: !!locationId,
  });
}

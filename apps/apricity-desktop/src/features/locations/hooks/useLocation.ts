import { useQuery } from "@tanstack/react-query";
import { getLocationByID } from "@/features/locations";

export function useLocation(locationId?: string | null) {
  return useQuery({
    queryKey: ["locations", locationId],
    queryFn: () => {
      if (!locationId) throw new Error("Missing loactionId");
      return getLocationByID(locationId);
    },
    enabled: !!locationId,
  });
}

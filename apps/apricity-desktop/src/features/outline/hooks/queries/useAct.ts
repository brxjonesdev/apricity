import { useQuery } from "@tanstack/react-query";
import { getActById } from "@/features/outline";

export function useAct(actId?: string | null) {
  return useQuery({
    queryKey: ["acts", actId],
    queryFn: () => {
      if (!actId) throw new Error("Missing act id");
      return getActById(actId);
    },
    enabled: !!actId,
  });
}

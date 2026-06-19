import { useQuery } from "@tanstack/react-query";
import { getActById } from "@/features/outline";
import { queryKeys } from "@/features/structure/lib/querykeys";

export function useAct(actId?: string | null) {
  return useQuery({
    queryKey: queryKeys.outline.acts.detail(actId ?? ""),
    queryFn: () => {
      if (!actId) throw new Error("Missing act id");
      return getActById(actId);
    },
    enabled: !!actId,
  });
}

import { useQuery } from "@tanstack/react-query";
import { getUserLibrary } from "@/features/library";

export function useStories() {
  return useQuery({
    queryKey: ["stories"],
    queryFn: getUserLibrary,
  });
}

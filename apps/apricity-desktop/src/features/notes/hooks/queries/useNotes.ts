import { useQuery } from "@tanstack/react-query";
import { getAllNotes } from "@/features/notes";
import { queryKeys } from "@/features/structure/lib/querykeys";

export function useNotes(storyId?: string | null) {
  return useQuery({
    queryKey: queryKeys.notes.list(storyId ?? ""),
    queryFn: () => getAllNotes(storyId as string),
    enabled: !!storyId,
  });
}

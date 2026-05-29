import { useQuery } from "@tanstack/react-query";
import { getAllNotes } from "@/features/notes";

export function useNotes(storyId?: string | null) {
  return useQuery({
    queryKey: ["notes", storyId],
    queryFn: () => getAllNotes(storyId as string),
    enabled: !!storyId,
  });
}

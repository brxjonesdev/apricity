import { useQuery } from "@tanstack/react-query";
import { getNoteById } from "@/features/notes";
import { queryKeys } from "@/features/structure/lib/querykeys";

export function useNote(noteId?: string | null) {
  return useQuery({
    queryKey: queryKeys.notes.detail(noteId ?? ""),
    queryFn: () => {
      if (!noteId) throw new Error("Missing characterId");
      return getNoteById(noteId);
    },
    enabled: !!noteId,
  });
}

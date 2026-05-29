import { useQuery } from "@tanstack/react-query";
import { getNoteById } from "@/features/notes";

export function useNote(noteId?: string | null) {
  return useQuery({
    queryKey: ["notes", noteId],
    queryFn: () => {
      if (!noteId) throw new Error("Missing characterId");
      return getNoteById(noteId);
    },
    enabled: !!noteId,
  });
}

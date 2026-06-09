import { useQuery } from "@tanstack/react-query";
import { getChapterById } from "@/features/structure";
import { queryKeys } from "@/lib/querykeys";

export function useChapter(chapterId?: string | null) {
  return useQuery({
    queryKey: queryKeys.structure.chapters.detail(chapterId ?? ""),
    queryFn: () => {
      if (!chapterId) throw new Error("Missing chapter id");
      return getChapterById(chapterId);
    },
    enabled: !!chapterId,
  });
}

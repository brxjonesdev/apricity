import { useQuery } from "@tanstack/react-query";
import { getAllCharacters } from "@/features/characters";
import { queryKeys } from "@/features/structure/lib/querykeys";

export function useCharacters(storyId?: string | null) {
  return useQuery({
    queryKey: queryKeys.characters.list(storyId ?? ""),
    queryFn: () => getAllCharacters(storyId as string),
    enabled: !!storyId,
  });
}

import { useQuery } from "@tanstack/react-query";
import { getCharacterById } from "@/features/characters";
import { queryKeys } from "@/lib/querykeys";

export function useCharacter(characterId?: string | null) {
  return useQuery({
    queryKey: queryKeys.characters.detail(characterId ?? ""),
    queryFn: () => {
      if (!characterId) throw new Error("Missing characterId");
      return getCharacterById(characterId);
    },
    enabled: !!characterId,
  });
}

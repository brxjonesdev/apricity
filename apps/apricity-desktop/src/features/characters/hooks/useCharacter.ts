import { useQuery } from "@tanstack/react-query";
import { getCharacterById } from "@/features/characters";

export function useCharacter(characterId?: string | null) {
  return useQuery({
    queryKey: ["character", characterId],
    queryFn: () => {
      if (!characterId) throw new Error("Missing characterId");
      return getCharacterById(characterId);
    },
    enabled: !!characterId,
  });
}

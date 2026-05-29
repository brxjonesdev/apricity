import { useQuery } from "@tanstack/react-query";
import { getAllCharacters } from "@/features/characters";

export function useCharacters(storyId?: string | null) {
  return useQuery({
    queryKey: ["characters", storyId],
    queryFn: () => getAllCharacters(storyId as string),
    enabled: !!storyId,
  });
}

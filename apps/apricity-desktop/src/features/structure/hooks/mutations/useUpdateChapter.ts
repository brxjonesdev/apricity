import { updateChapter } from "@/features/structure";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateChapterPayload = {
  id: string;
  updates: any;
};

export function useUpdateChapter(storyId?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateChapterPayload) =>
      updateChapter(payload.id, payload.updates),
    onSuccess: () => {
      if (storyId) {
        queryClient.invalidateQueries({ queryKey: ["chapters", storyId] });
      }
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reorderScenes } from "../commands/reorder-scenes";
import { sceneQueries } from "../querykeys";

export function useReorderSceneMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      storyId,
      chapterId,
      reorderedSceneIds,
    }: {
      storyId: string;
      chapterId: string;
      reorderedSceneIds: string[];
    }) => reorderScenes(chapterId, reorderedSceneIds),

    onSuccess: (_, { storyId, chapterId }) => {
      queryClient.invalidateQueries({
        queryKey: sceneQueries.byChapter(chapterId),
      });

      queryClient.invalidateQueries({
        queryKey: sceneQueries.byStory(storyId),
      });
    },
  });
}
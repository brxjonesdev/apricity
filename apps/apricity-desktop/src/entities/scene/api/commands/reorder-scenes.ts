import { USE_MOCKS } from '@/shared/config/env';
import mockScenes from '../mockdata';
import { call } from '@/shared/lib/api/tauriClient';

export async function reorderScenes(
  chapterId: string,
  reorderedSceneIds: string[],
): Promise<void> {
  if (USE_MOCKS) {
    reorderedSceneIds.forEach((sceneId, index) => {
      const scene = mockScenes.find((scene) => scene.scene_id == sceneId);
      if (scene) {
        scene.order = index;
      }
    });
    return;
  }
  const res = await call<void>('reorder_stories', {
    chapter_id: chapterId,
    new_order: reorderedSceneIds,
  });
  if (!res.ok) {
    throw new Error(res.error);
  }
  return;
}

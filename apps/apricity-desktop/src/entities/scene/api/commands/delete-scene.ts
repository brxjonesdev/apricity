import { USE_MOCKS } from '@/shared/config/env';
import mockScenes from '../mockdata';
import { call } from '@/shared/lib/api/tauriClient';

export async function deleteScene(sceneId: string): Promise<void> {
  if (USE_MOCKS) {
    const index = mockScenes.findIndex((s) => s.scene_id === sceneId);
    if (index !== -1) {
      mockScenes.splice(index, 1);
    }
    return;
  }

  const res = await call<void>('delete_scene', { scene_id: sceneId });
  if (!res.ok) {
    throw new Error(res.error);
  }
  return;
}

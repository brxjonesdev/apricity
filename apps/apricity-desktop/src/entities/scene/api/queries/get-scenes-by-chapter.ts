import { USE_MOCKS } from '@/shared/config/env';
import { Scene } from '../../model/types';
import mockScenes from '../mockdata';
import { sceneMapper } from '../mappers/scene.mapper';
import { call } from '@/shared/lib/api/tauriClient';
import { SceneDTO } from '../dto/scene.dto';

export async function getScenesByChapterId(
  chapterId: string,
): Promise<Scene[]> {
  if (USE_MOCKS) {
    const scenes = mockScenes.filter((s) => s.chapter_id === chapterId);
    return scenes.map((s) => sceneMapper.mapScene(s));
  }

  const res = await call<SceneDTO[]>('get_scenes_by_chapter', {
    chapter_id: chapterId,
  });
  if (!res.ok) {
    throw new Error(res.error);
  }
  return res.data.map(sceneMapper.mapScene);
}

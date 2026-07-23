import { call } from '@/shared/lib/api/tauriClient';
import { Scene } from '../../model/types';
import { SceneDTO } from '../dto/scene.dto';
import { CreateSceneDTO } from '../dto/scene.create.dto';
import { sceneMapper } from '../mappers/scene.mapper';
import { USE_MOCKS } from '@/shared/config/env';
import mockScenes from '../mockdata';

export async function createScene(input: CreateSceneDTO): Promise<Scene> {
  if (USE_MOCKS) {
    const newScene: SceneDTO = {
      ...input,
      scene_id: `scene_${Math.floor(Math.random() * 10)}_${input.order}`,
    };
    mockScenes.push(newScene);
    return sceneMapper.mapScene(newScene);
  }
  const res = await call<SceneDTO>('create_scene', { input: input });
  if (!res.ok) {
    throw new Error(res.error);
  }
  return sceneMapper.mapScene(res.data);
}

import { USE_MOCKS } from "@/shared/config/env";
import { Scene } from "../../model/types";
import mockScenes from "../mockdata";
import { sceneMapper } from "../mappers/scene.mapper";
import { call } from "@/shared/lib/api/tauriClient";
import { SceneDTO } from "../dto/scene.dto";

export async function getSceneById(sceneId: string): Promise<Scene>{
  if (USE_MOCKS) {
    const index = mockScenes.findIndex((s) => s.scene_id === sceneId);
    if (index !== -1) return sceneMapper.mapScene(mockScenes[index]);
    else throw new Error("Scene not found");
  }
  const res = await call<SceneDTO>("get_scene_by_id", { scene_id: sceneId });
  if (!res.ok) {
    throw new Error(res.error);
  } else {
    return sceneMapper.mapScene(res.data);
  }
}

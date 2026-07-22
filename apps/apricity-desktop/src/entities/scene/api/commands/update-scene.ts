import { USE_MOCKS } from "@/shared/config/env";
import { UpdateSceneDTO } from "../dto/scene.update.dto";
import mockScenes from "../mockdata";
import { call } from "@/shared/lib/api/tauriClient";

export async function updateScene(
  sceneId: string,
  dto: UpdateSceneDTO,
): Promise<void>{
  if (USE_MOCKS) {
    const index = mockScenes.findIndex((s) => s.scene_id === sceneId);
    if (index === -1) {
          throw new Error(`Scene not found: ${sceneId}`);
    }
    mockScenes[index] = {
      ...mockScenes[index],
      ...dto,
      last_updated_at: new Date().toISOString(),
    };
    return
  }

  const res = await call<void>("update_scene", { scene_id: sceneId, updates: dto });
  if (!res.ok) {
    throw new Error(res.error)
  }
  return
}

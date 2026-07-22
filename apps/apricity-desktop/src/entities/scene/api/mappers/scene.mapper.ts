import { Scene } from "../../model/types";
import { SceneDTO } from "../dto/scene.dto";

function mapScene(dto: SceneDTO): Scene {
  return {
    sceneId: dto.scene_id,
    chapterId: dto.chapter_id,
    title: dto.title,
    synopsis: dto.synopsis,
    order: dto.order,
    content: dto.content,
    lastUpdatedAt: dto.last_updated_at
      ? new Date(dto.last_updated_at)
      : null,

  }
}




export const sceneMapper = {
  mapScene,
}

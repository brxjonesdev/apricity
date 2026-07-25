import { Scene, SceneOutline } from '../../model/types';
import { SceneDTO } from '../dto/scene.dto';
import { SceneOutlineDTO } from '../dto/scene.outline.dto';

function mapScene(dto: SceneDTO): Scene {
  return {
    sceneId: dto.scene_id,
    chapterId: dto.chapter_id,
    storyId: dto.story_id,
    title: dto.title,
    synopsis: dto.synopsis,
    order: dto.order,
    content: dto.content,
    lastUpdatedAt: dto.last_updated_at ? new Date(dto.last_updated_at) : null,
  };
}

function mapSceneOutline(dto: SceneOutlineDTO): SceneOutline {
  return {
    sceneId: dto.scene_id,
    chapterId: dto.chapter_id,
    storyId: dto.story_id,
    order: dto.order,
    title: dto.title,
  };
}

export const sceneMapper = {
  mapScene,
  mapSceneOutline,
};
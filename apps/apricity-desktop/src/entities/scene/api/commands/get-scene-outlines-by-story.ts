import { USE_MOCKS } from "@/shared/config/env";
import { Scene, SceneOutline } from "../../model/types";
import {mockScenes} from "../mockdata";
import { sceneMapper } from "../mappers/scene.mapper";
import { call } from "@/shared/lib/api/tauriClient";
import { StoryDTO } from "@/entities/story/api/dto/story.dto";
import { SceneDTO } from "../dto/scene.dto";
import { SceneOutlineDTO } from "../dto/scene.outline.dto";
import { delay } from "@/shared/utils";

export async function getSceneOutlinesByStoryId(storyId: string): Promise<SceneOutline[]> {
  if (USE_MOCKS) {
    await delay(800)
    const scenes = mockScenes.filter((s) => s.story_id === storyId);
    return scenes.map((s) => sceneMapper.mapSceneOutline(s))
  }

  const res = await call <SceneOutlineDTO[]>("get_scene_outlines_by_story", { story_id: storyId });
  if (!res.ok) {
    throw new Error
  }

  return res.data.map((s)=> sceneMapper.mapSceneOutline(s))
}
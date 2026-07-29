import { USE_MOCKS } from "@/shared/config/env";
import { Scene } from "../../model/types";
import {mockScenes} from "../mockdata";
import { sceneMapper } from "../mappers/scene.mapper";
import { call } from "@/shared/lib/api/tauriClient";
import { StoryDTO } from "@/entities/story/api/dto/story.dto";
import { SceneDTO } from "../dto/scene.dto";

export async function getScenesByStoryId(storyId: string): Promise<Scene[]> {
  if (USE_MOCKS) {
    const scenes = mockScenes.filter((s) => s.story_id === storyId);
    return scenes.map((s) => sceneMapper.mapScene(s))
  }

  const res = await call<SceneDTO[]>("get_scenes_by_story_id", { story_id: storyId });
  if (!res.ok) {
    throw new Error
  }

  return res.data.map((s)=> sceneMapper.mapScene(s))
}
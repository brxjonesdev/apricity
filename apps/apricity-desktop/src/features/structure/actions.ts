import {
  Chapter,
  ChapterCreateInput,
  ChapterUpdateInput,
  Scene,
  SceneCreateInput,
  SceneUpdateInput,
} from "@/features/structure"; // or wherever you place it

import { call } from "@/shared/api/tauriClient";

// Get all chapters in a story
export function getAllChapters(storyId: string) {
  return call<Chapter[]>("get_all_chapters", { storyId });
}

// Get chapter by ID
export function getChapterById(id: string) {
  return call<Chapter>("get_chapter_by_id", { id });
}

// Create chapter
export function createChapter(input: ChapterCreateInput) {
  return call<Chapter>("create_chapter", { input });
}

// Update chapter
export function updateChapter(id: string, updates: ChapterUpdateInput) {
  return call<Chapter>("update_chapter", { id, updates });
}

// Delete chapter
export function deleteChapter(id: string) {
  return call<boolean>("delete_chapter", { id });
}

// Reorder chapters
// export function reorderChapters(input: {
//   storyId: string;
//   orderedIds: string[];
// }) {
//   return call<boolean>("reorder_chapters", { input });
// }

// Get all scenes in a chapter
export function getScenesByChapter(chapterId: string) {
  return call<Scene[]>("get_scenes_by_chapter", {
    chapterId,
  });
}

// Get scene by ID
export function getSceneById(id: string) {
  return call<Scene>("get_scene_by_id", { id });
}

// Create scene
export function createScene(input: SceneCreateInput) {
  return call<Scene>("create_scene", { input });
}

// Update scene
export function updateScene(id: string, updates: SceneUpdateInput) {
  return call<Scene>("update_scene", { id, updates });
}

// Delete scene
export function deleteScene(id: string) {
  return call<boolean>("delete_scene", { id });
}

// Reorder scenes (within chapter)
// export function reorderScenes(input: {
//   chapterId: string;
//   orderedIds: string[];
// }) {
//   return call<boolean>("reorder_scenes", { input });
// }

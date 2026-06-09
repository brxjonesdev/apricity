import {
  Chapter,
  ChapterCreateInput,
  ChapterUpdateInput,
  Scene,
  SceneCreateInput,
  SceneUpdateInput,
} from "@/features/structure"; // or wherever you place it

import { call } from "@/shared/api/tauriClient";
import { USE_MOCKS } from "@/shared/config/env";
import { success } from "@/shared/types";
import { mockChapters, mockScenes } from "./mockdata";

// Get all chapters in a story
export function getAllChapters(storyId: string) {
  if (USE_MOCKS) {
    const chapters = mockChapters.filter((c) => c.storyId === storyId);
    return Promise.resolve(success(chapters));
  }
  return call<Chapter[]>("get_all_chapters", { storyId });
}

// Get chapter by ID
export function getChapterById(id: string) {
  if (USE_MOCKS) {
    const chapters = mockChapters.filter((c) => c.id === id);
    if (chapters.length > 0) {
      return Promise.resolve(success(chapters[0]));
    }
    return Promise.reject(new Error("Chapter not found"));
  }
  return call<Chapter>("get_chapter_by_id", { id });
}

// Create chapter
export function createChapter(input: ChapterCreateInput) {
  if (USE_MOCKS) {
    const newChapter: Chapter = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    console.log(newChapter);
    if (!input.storyId) {
      return Promise.reject(new Error("Story not found"));
    }
    mockChapters.push(newChapter);
    return Promise.resolve(success(newChapter));
  }
  return call<Chapter>("create_chapter", { input });
}

// Update chapter
export function updateChapter(id: string, updates: ChapterUpdateInput) {
  if (USE_MOCKS) {
    const index = mockChapters.findIndex((c) => c.id === id);
    if (index < 0) {
      return Promise.reject(new Error("Chapter not found"));
    }
    const chapter = mockChapters[index];
    mockChapters[index] = {
      ...chapter,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return Promise.resolve(success(mockChapters[index]));
  }
  return call<Chapter>("update_chapter", { id, updates });
}

// Delete chapter
export function deleteChapter(id: string) {
  if (USE_MOCKS) {
    const index = mockChapters.findIndex((c) => c.id === id);
    if (index >= 0) {
      mockChapters.splice(index, 1);
      return Promise.resolve(success(true));
    }
    return Promise.reject(new Error("Chapter not found"));
  }
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
  if (USE_MOCKS) {
    const scenes = mockScenes.filter((c) => c.chapterId === chapterId);
    return Promise.resolve(success(scenes));
  }
  return call<Scene[]>("get_scenes_by_chapter", {
    chapterId,
  });
}

// Get scene by ID
export function getSceneById(id: string) {
  if (USE_MOCKS) {
    const scene = mockScenes.find((c) => c.id === id);
    if (!scene) throw new Error("Scene not found");
    return Promise.resolve(success(scene));
  }
  return call<Scene>("get_scene_by_id", { id });
}

// Create scene
export function createScene(input: SceneCreateInput) {
  if (USE_MOCKS) {
    if (!input.chapterId) {
      return Promise.reject("Needs Chapter ID");
    }
    const newScene: Scene = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockScenes.push(newScene);
    return Promise.resolve(success(newScene));
  }
  return call<Scene>("create_scene", { input });
}

// Update scene
export function updateScene(id: string, updates: SceneUpdateInput) {
  if (USE_MOCKS) {
    const index = mockScenes.findIndex((c) => c.id === id);
    if (index < 0) throw new Error("Scene not found");
    const scene = mockScenes[index];
    mockScenes[index] = {
      ...scene,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return Promise.resolve(success(mockScenes[index]));
  }
  return call<Scene>("update_scene", { id, updates });
}

// Delete scene
export function deleteScene(id: string) {
  if (USE_MOCKS) {
    const index = mockScenes.findIndex((c) => c.id === id);
    if (index < 0) throw new Error("Scene not found");
    mockScenes.splice(index, 1);
    return Promise.resolve(success(true));
  }
  return call<boolean>("delete_scene", { id });
}

// Reorder scenes (within chapter)
// export function reorderScenes(input: {
//   chapterId: string;
//   orderedIds: string[];
// }) {
//   return call<boolean>("reorder_scenes", { input });
// }

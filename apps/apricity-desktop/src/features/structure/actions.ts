import { call } from "@/shared/lib/api/tauriClient";
import { USE_MOCKS } from "@/shared/config/env";
import {
  ChapterDTO,
  ChapterCreateInput,
  ChapterUpdateInput,
  SceneDTO,
  SceneCreateInput,
  SceneUpdateInput,
  mockChapters,
  mockScenes,
  ChapterDB,
  SceneDB,
  sceneEntity,
} from "@/features/structure";
import { success } from "@/shared/types";
import { chapterEntity } from "./chapter.entity";

// Get all chapters in a story
export function getAllChapters(storyId: SceneDTO["storyId"]) {
  if (USE_MOCKS) {
    const chapters = mockChapters.filter((c) => c.storyId === storyId);
    return Promise.resolve(
      success(chapters.map((c) => chapterEntity.mapDbToDTO(c))),
    );
  }
  return call<ChapterDTO[]>("get_all_chapters", { storyId });
}

// Get chapter by ID
export function getChapterById(id: string) {
  if (USE_MOCKS) {
    const chapter = mockChapters.filter((c) => c.id === id);
    if (!chapter) {
      return Promise.reject(new Error("Chapter not found"));
    }
    return Promise.resolve(success(chapterEntity.mapDbToDTO(chapter[0])));
  }
  return call<ChapterDTO>("get_chapter_by_id", { id });
}

// Create chapter
export function createChapter(input: ChapterCreateInput) {
  if (USE_MOCKS) {
    if (!input.storyId) {
      return Promise.reject(new Error("Story not found"));
    }
    const newChapter: ChapterDB = {
      ...input,
      id: crypto.randomUUID(),
      storyId: input.storyId,
      summary: input.summary || null,
      createdAt: new Date().toISOString(),
      order: mockChapters.length + 1,
      lastUpdatedAt: new Date().toISOString(),
    };
    console.log(newChapter);
    mockChapters.push(newChapter);
    return Promise.resolve(success(chapterEntity.mapDbToDTO(newChapter)));
  }
  return call<ChapterDTO>("create_chapter", { input });
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
      lastUpdatedAt: new Date().toISOString(),
    };
    return Promise.resolve(
      success(chapterEntity.mapDbToDTO(mockChapters[index])),
    );
  }
  return call<ChapterDTO>("update_chapter", { id, updates });
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
    return Promise.resolve(
      success(scenes.map((s) => sceneEntity.mapDbToDTO(s))),
    );
  }
  return call<SceneDTO[]>("get_scenes_by_chapter", {
    chapterId,
  });
}

// Get scene by ID
export function getSceneById(id: string) {
  if (USE_MOCKS) {
    const scene = mockScenes.find((c) => c.id === id);
    if (!scene) throw new Error("Scene not found");
    return Promise.resolve(success(sceneEntity.mapDbToDTO(scene)));
  }
  return call<SceneDTO>("get_scene_by_id", { id });
}

// Create scene
export function createScene(input: SceneCreateInput) {
  if (USE_MOCKS) {
    if (!input.chapterID) {
      return Promise.reject("Needs Chapter ID");
    }
    if (!input.storyId) {
      return Promise.reject("Needs Story ID");
    }
    const newScene: SceneDB = {
      ...input,
      id: crypto.randomUUID(),
      order: mockScenes.length + 1,
      chapterId: input.chapterID,
      storyId: input.storyId,
      synopsis: input.synopsis || null,
      createdAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
    };
    mockScenes.push(newScene);
    return Promise.resolve(success(sceneEntity.mapDbToDTO(newScene)));
  }
  return call<SceneDTO>("create_scene", { input });
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
      lastUpdatedAt: new Date().toISOString(),
    };
    return Promise.resolve(success(sceneEntity.mapDbToDTO(scene)));
  }
  return call<SceneDTO>("update_scene", { id, updates });
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

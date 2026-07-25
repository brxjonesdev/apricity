import { Chapter } from "@/entities/chapter";
import { Scene } from "@/entities/scene";

// A chapter with its scenes
export type Outline = {
  chapter: Chapter;
  scenes: Scene[];
};

export function composeOutline(
  chapters: Chapter[],
  scenes: Scene[],
): Outline[] {
  const scenesByChapter = new Map<string, Scene[]>();

  // Group scenes by chapter
  for (const scene of scenes) {
    const chapterScenes = scenesByChapter.get(scene.chapterId) ?? [];
    chapterScenes.push(scene);
    scenesByChapter.set(scene.chapterId, chapterScenes);
  }

  // Compose the outline
  return chapters.map((chapter) => ({
    chapter,
    scenes: scenesByChapter.get(chapter.id) ?? [],
  }));
}
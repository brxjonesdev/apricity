import {useChaptersByStoryQuery} from "@/entities/chapter";
import { useScenesByStoryQuery, useSceneOutlinesByStoryQuery } from "@/entities/scene";
import { useMemo } from "react";
import { composeOutline } from "./composeOutline";
export function useManuscriptOutline(storyId: string) {
  const { data: chapters = [], isLoading: chaptersLoading } = useChaptersByStoryQuery(storyId);
  const { data: scenes = [], isLoading: scenesLoading } = useSceneOutlinesByStoryQuery(storyId);

  const outline = useMemo(
    () => composeOutline(chapters, scenes),
    [chapters, scenes]
  );
  return {
    outline,
    isLoading: chaptersLoading || scenesLoading,
  }
}
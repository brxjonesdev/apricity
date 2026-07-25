import { JSONContent } from '@tiptap/core';

export type Scene = {
  sceneId: string;
  chapterId: string;
  storyId: string;
  title: string;
  synopsis: string;
  content: JSONContent;
  order: number;
  lastUpdatedAt: Date | null;
};

export type SceneOutline = {
  sceneId: string;
  chapterId: string;
  storyId: string;
  order: number;
  title: string | null;
  // no `content` — deliberately excluded, that's the whole point
};
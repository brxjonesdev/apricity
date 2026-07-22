import { JSONContent } from '@tiptap/core';
export type SceneDTO = {
  scene_id: string;
  chapter_id: string;
  title: string;
  synopsis: string;
  content: JSONContent; // stringified json
  order: number;
  last_updated_at?: string | null;
  created_at: string;
};

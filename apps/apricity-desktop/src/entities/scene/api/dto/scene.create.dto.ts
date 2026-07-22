import { JSONContent } from '@tiptap/core';
export type CreateSceneDTO = {
  chapter_id: string;
  title: string;
  synopsis: string;
  content: JSONContent; // stringified json
  order: number;
  last_updated_at: null;
  created_at: string;
};

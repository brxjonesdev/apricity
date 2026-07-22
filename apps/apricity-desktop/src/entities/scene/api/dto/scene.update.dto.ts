import { JSONContent } from '@tiptap/core';

export type UpdateSceneDTO = {
  title?: string;
  synopsis?: string;
  content?: JSONContent;
  order?: number;
};

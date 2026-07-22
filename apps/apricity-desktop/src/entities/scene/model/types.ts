import { JSONContent } from "@tiptap/core";

export type Scene = {
  sceneId: string;
  chapterId: string;
  title: string;
  synopsis: string;
  content: JSONContent
  order: number;
  lastUpdatedAt: Date | null ;
}

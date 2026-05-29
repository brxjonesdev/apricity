import type { JSONContent } from "@tiptap/core";

export type EditorDocument = {
  sceneId: string;
  storyId: string;
  content: JSONContent;
  updatedAt: string;
};

export type EditorState = {
  sceneId: string | null;
  isDirty: boolean;
  isSaving: boolean;
  lastSavedAt: string | null;
  selectionText?: string;
};

export type EntityType = "character" | "event" | "location" | "group" | "scene";

export type EntityMention = {
  entityType: EntityType;
  entityId: string;
  label: string;
};

export type EditorMentions = {
  sceneId: string;
  mentions: EntityMention[];
};

export type EditorSaveInput = {
  sceneId: string;
  content: JSONContent;
};

export type EditorSyncMentionsInput = {
  sceneId: string;
  mentions: EntityMention[];
};

import type { JSONContent } from "@tiptap/core";
import { call } from "@/shared/lib/api/tauriClient";
import { Scene } from "@/features/structure";
import { EntityMention, EditorSyncMentionsInput } from "@/features/editor";

export function getSceneForEditor(sceneId: string) {
  return call<Scene>("get_scene", { id: sceneId });
}

export function saveSceneContent(input: {
  sceneId: string;
  content: JSONContent;
}) {
  return call<Scene>("update_scene_content", {
    sceneId: input.sceneId,
    content: input.content,
  });
}

export function extractSceneMentions(sceneId: string) {
  const mentions: EntityMention[] = [];
  return mentions;
}

export function syncSceneMentions(input: EditorSyncMentionsInput) {
  return call<boolean>("sync_scene_mentions_to_graph", {
    sceneId: input.sceneId,
    mentions: input.mentions,
  });
}

export async function saveEditorState(input: {
  sceneId: string;
  content: JSONContent;
}) {
  // 1. Save scene content
  const updatedScene = await saveSceneContent(input);

  // 2. Extract mentions
  const mentions = await extractSceneMentions(input.sceneId);

  // 3. Sync graph links
  await syncSceneMentions({
    sceneId: input.sceneId,
    mentions,
  });

  return updatedScene;
}

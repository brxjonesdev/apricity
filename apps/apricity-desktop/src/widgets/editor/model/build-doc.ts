import { useActiveStory } from "@/app/layouts/contexts/active-story.context";
import { useEditorView } from "../model/editor-context";
import { Tiptap, useEditor, useTiptap, useTiptapState } from '@tiptap/react'
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import { SceneDTO } from "@/entities/scene/api/dto/scene.dto";
import { Scene } from "@/entities/scene";
import { JSONContent } from "@tiptap/react";
import { useQuery } from '@tanstack/react-query';
import { getSceneById } from "@/entities/scene/api/commands/get-scene-details";
import { getChapterById } from "@/entities/chapter/api/commands/get-chapter-by-id";
import { getScenesByChapterId } from "@/entities/scene/api/commands/get-scenes-by-chapter";
export function buildChapterDoc(scenes: Scene[]): JSONContent {
  const sorted = [...scenes].sort((a, b) => a.order - b.order);

  return {
    type: 'doc',
    content: sorted.flatMap((scene) => [
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: scene.title }],
      },
      ...getBlockContent(scene.content),
    ]),
  };
}

// Handles both `{ type: 'doc', content: [...] }` and a bare content array,
// in case the DTO's shape drifts or a scene has empty/null content.
function getBlockContent(content: JSONContent | null | undefined): JSONContent[] {
  if (!content) return [{ type: 'paragraph' }];
  if (content.type === 'doc') return content.content ?? [{ type: 'paragraph' }];
  return [content]; // content was already a single block node, not wrapped in a doc
}
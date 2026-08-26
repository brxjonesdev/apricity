// components/editor-panel.tsx
import { useEditorView } from "../model/editor-context";
import { useActiveContent } from "../model/use-active-content";
import Editor from "./editor";
import { JSONContent } from "@tiptap/core";

type Props = { initialContent: JSONContent; docId: string; }
export default function EditorPanel({initialContent, docId}:Props) {
  return (
    <Editor
      initialContent={initialContent}
      docId={docId}
    />
  );
}
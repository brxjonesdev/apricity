import { useEffect, useMemo, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useSceneDetailsQuery, useScenesByChapterQuery } from "@/entities/scene";

export default function Editor() {
  const [showAllScenes, setShowAllScenes] = useState(true);

  const { data: scenes } = useScenesByChapterQuery("story-001-chapter-1");
  const { data: scene } = useSceneDetailsQuery("story-001-chapter-1-scene-1");

  const mergedDocument = useMemo(() => {
    if (!scenes) return null;

    return {
      type: "doc",
      content: scenes.flatMap((scene) => [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: scene.title }],
        },
        ...(scene.content.content ?? []),
      ]),
    };
  }, [scenes]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  useEffect(() => {
    if (!editor) return;

    if (showAllScenes && mergedDocument) {
      editor.commands.setContent(mergedDocument);
    }

    if (!showAllScenes && scene) {
      editor.commands.setContent(scene.content);
    }
  }, [editor, showAllScenes, mergedDocument, scene]);

  if (!editor) return null;

  // return (
  //   <div>
  //     <button onClick={() => setShowAllScenes((prev) => !prev)}>
  //       {showAllScenes ? "Show One Scene" : "Show All Scenes"}
  //     </button>

  //     <EditorContent editor={editor} />
  //   </div>
  // );
   
}
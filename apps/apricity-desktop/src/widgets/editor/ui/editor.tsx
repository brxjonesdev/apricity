import { useActiveStory } from "@/app/layouts/contexts/active-story.context";
import { useEditorView } from "../model/editor-context";
import { Tiptap, useEditor, useTiptap, useTiptapState } from '@tiptap/react'
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'


export default function Editor() {
  const { setActiveID } = useEditorView();
  // fetches chapter or scene by id
  const editor = useEditor({ extensions: [StarterKit], content: '<p>Hello World!</p>' })
  if (!editor) return null

  return (
    <Tiptap editor={editor}>
      <MenuBar />
      <Tiptap.Content />
      <WordCount />
      <BubbleMenu editor={editor}><button>Bold</button></BubbleMenu>
      <FloatingMenu editor={editor}><button>Add heading</button></FloatingMenu>
    </Tiptap>
  )
}

function MenuBar() {
  const { editor } = useTiptap()
  if (!editor) return null
  return (
    <button onClick={() => editor.chain().focus().toggleBold().run()}>
      Bold
    </button>
  )
}

function WordCount() {
  const wordCount = useTiptapState((state) =>
    state.editor.state.doc.textContent.split(/\s+/).filter(Boolean).length
  )
  return <span>{wordCount} words</span>
}

// components/editor.tsx
import { Tiptap, useEditor, useTiptap, useTiptapState } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import type { JSONContent } from '@tiptap/react'

export default function Editor({ initialContent, docId }: { initialContent: JSONContent; docId: string }) {
  const editor = useEditor({ extensions: [StarterKit], content: initialContent })
  if (!editor) return null

  return (
    <Tiptap editor={editor}>
      <MenuBar />
      <Tiptap.Content />
      <WordCount />
      <BubbleMenu editor={editor}><button>Bold</button></BubbleMenu>
    </Tiptap>
  )
}

function MenuBar() {
  const { editor } = useTiptap()
  if (!editor) return null
  return <button onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
}

function WordCount() {
  const wordCount = useTiptapState((state) =>
    state.editor.state.doc.textContent.split(/\s+/).filter(Boolean).length
  )
  return <span>{wordCount} words</span>
}
import { useEditorView } from "@/widgets/editor/model/editor-context"

export default function EditorHelper({ children, id, type }: { children: React.ReactNode, id: string, type: "chapter" | "scene" }) {
  const {setActiveID, setType} = useEditorView()
  const handleClick = () => {
    setActiveID(id)
    setType(type)
  }
  return (
    <div onClick={handleClick}>
      {children}
    </div>
  )
}
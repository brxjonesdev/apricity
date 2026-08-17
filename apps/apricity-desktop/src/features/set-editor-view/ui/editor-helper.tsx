import { useEditorView } from "@/widgets/editor/model/editor-context"

export default function EditorHelper({ children, id }: { children: React.ReactNode, id: string }) {
  const {setActiveID} = useEditorView()
  const handleClick = () => {
    console.log("click", id)
    setActiveID(id)
  }
  return (
    <div onClick={handleClick}>
      {children}
    </div>
  )
}
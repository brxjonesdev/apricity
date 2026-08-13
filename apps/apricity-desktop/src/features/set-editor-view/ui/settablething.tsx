export default function EditorHelper({ children, id }: { children: React.ReactNode, id: string }) {
  const handleClick = () => {
    console.log(id)
  }
  return (
    <div onClick={handleClick}>
      {children}
    </div>
  )
}
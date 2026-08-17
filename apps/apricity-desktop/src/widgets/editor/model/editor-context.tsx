import { createContext, useContext, useState } from "react";

type EditorContextType = {
  activeID: string;
  setActiveID: (id: string) => void;
  type: "chapter" | "scene";
  setType: (type: "chapter" | "scene") => void
};

const EditorContext = createContext<EditorContextType | undefined>(
  undefined
);

export function EditorUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeID, setActiveID] = useState("");
  const [type, setType] = useState<"chapter" | "scene">("chapter");

  return (
    <EditorContext.Provider
      value={{
        activeID,
        setActiveID,
        type,
        setType
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditorView() {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error(
      "useEditorView must be used within an EditorProvider"
    );
  }

  return context;
}
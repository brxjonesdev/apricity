import EditorPanel from "@/widgets/editor/ui/editor-panel";
import { useEditorView } from "@/widgets/editor/model/editor-context";
import { useActiveContent } from "@/widgets/editor/model/use-active-content";
import { useState } from "react";
import {
  ButtonGroup,
} from "@/shared/components/shadcn/button-group"
import { Button } from "@/shared/components/shadcn/button";

export default function ManuscriptEditor() {
  const { activeID, type } = useEditorView();
  const { data, isLoading, error } = useActiveContent(activeID, type);
  const [viewMode, setViewMode] = useState<"editor" | "grid">("editor");

  // if (!activeID) return <EmptyState />;          // nothing selected in sidebar
  if (isLoading) return <div>Loading...</div>;
  // if (error) return <ErrorState error={error} />; // was returning null — see below
  if (!data) return null;

  return (
    <main>
      <section className="border-b p-1">
        <div>{data.title}</div>
        <ButtonGroup>
          <Button onClick={() => setViewMode("editor")}>Editor</Button>
          <Button onClick={() => setViewMode("grid")}>Grid</Button>
        </ButtonGroup>
      </section>
      {viewMode === "editor" && (
        <EditorPanel
          key={`${type}-${activeID}`}
          initialContent={data.content}
          docId={activeID}
        />
      )}
      {viewMode === "grid" && null /* GridPanel later */}
    </main>
  )
}
import { useDroppable } from "@dnd-kit/react";

type ChapterDropZoneProps = {
  id: "chapter-top" | "chapter-bottom";
};

export function ChapterDropZone({ id }: ChapterDropZoneProps) {
  const { ref, isDropTarget } = useDroppable({
    id,
    data: {
      type: id,
    },
  });

  return (
    <div
      ref={ref}
      className={`h-8 rounded-md border border-dashed border-muted-foreground/30 transition-colors ${
        isDropTarget ? "bg-accent" : "bg-muted/20"
      }`}
    />
  );
}
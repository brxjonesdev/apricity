import { useDroppable } from "@dnd-kit/react";

type SceneDropZoneProps = {
  chapterId: string;
  children: React.ReactNode;
};

export function SceneDropZone({
  chapterId,
  children,
}: SceneDropZoneProps) {
  const { ref, isDropTarget } = useDroppable({
    id: `chapter-scenes-${chapterId}`,
    data: {
      type: "scene-drop-zone",
      chapterId,
    },
  });

  return (
    <div
      ref={ref}
      className={isDropTarget ? "bg-accent/50 rounded-md" : ""}
    >
      {children}
    </div>
  );
}
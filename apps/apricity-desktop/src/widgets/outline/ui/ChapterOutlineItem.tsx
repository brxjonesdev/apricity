import { useState } from "react";
import { ChevronRight, GripVertical } from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/shared/components/shadcn/collapsible";
import {
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/shared/components/shadcn/sidebar";
import { SceneDropZone } from "./SceneDropZone";

import { Chapter } from "@/entities/chapter";
import { SceneOutline } from "@/entities/scene";
import { SceneOutlineItem } from "./SceneOutlineItem";
import EditorHelper from "@/features/set-editor-view/ui/editor-helper";
import { useSortable } from "@dnd-kit/react/sortable";

type ChapterOutlineItemProps = {
  chapter: Chapter;
  scenes: SceneOutline[];
  index: number
};

export function ChapterOutlineItem({
  chapter,
  scenes,
  index
}: ChapterOutlineItemProps) {
  const [open, setOpen] = useState(false);

  const { ref, handleRef, isDragging } = useSortable({
    id: chapter.chapterId,
    index,
    data: {
        type: "chapter",
      },
  });

  return (
    <SidebarMenuItem ref={ref}>
      <Collapsible open={open} onOpenChange={setOpen}>
        <EditorHelper id={chapter.chapterId} type="chapter">
          <SidebarMenuButton
            className="w-full"
            onClick={() => setOpen((value) => !value)}
          >
            <span
              ref={handleRef}
              className="cursor-grab touch-none"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Drag ${chapter.title}`}
            >
              <GripVertical className="h-4 w-4" />
            </span>
    
            <span className="min-w-0 flex-1 truncate text-xs">
              {chapter.title}
            </span>
    
            <ChevronRight
              className={`ml-auto h-4 w-4 transition-transform ${
                open ? "rotate-90" : ""
              }`}
            />
          </SidebarMenuButton>
        </EditorHelper>
    
        <CollapsibleContent>
          <SceneDropZone chapterId={chapter.chapterId}>
            {scenes.map((scene, index) => (
              <SceneOutlineItem
                key={scene.sceneId}
                scene={scene}
                index={index}
              />
            ))}
          </SceneDropZone>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}

// {outline.map(({ chapter, scenes }, index) => (
//   <ChapterOutlineItem
//     key={chapter.chapterId}
//     chapter={chapter}
//     scenes={scenes}
//     index={index}
//   />
// ))}
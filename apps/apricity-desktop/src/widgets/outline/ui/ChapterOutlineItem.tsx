import { useEffect, useState } from "react";
import { ChevronRight, GripVertical } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
} from "@/shared/components/shadcn/collapsible";
import {
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/shared/components/shadcn/sidebar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator
} from "@/shared/components/shadcn/context-menu";
import { Chapter } from "@/entities/chapter";
import { SceneOutline } from "@/entities/scene";
import { SceneOutlineItem } from "./SceneOutlineItem";
import EditorHelper from "@/features/set-editor-view/ui/editor-helper";
import { useSortable } from "@dnd-kit/react/sortable";
import ChapterContextMenu from "./ChapterContextMenu";

type ChapterOutlineItemProps = {
  chapter: Chapter;
  scenes: SceneOutline[];
  index: number;
};

export function ChapterOutlineItem({
  chapter,
  scenes,
  index,
}: ChapterOutlineItemProps) {
  const [open, setOpen] = useState(false);

  const { ref, handleRef, isDragging } = useSortable({
    id: chapter.chapterId,
    index,
    data: {
      type: "chapter",
    },
  });

  useEffect(() => {
    if (isDragging) {
      setOpen(false);
    }
  }, [isDragging]);

  return (
    <SidebarMenuItem ref={ref}>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div>
            <Collapsible open={open} onOpenChange={setOpen}>
              <EditorHelper id={chapter.chapterId} type="chapter">
                <SidebarMenuButton
                  className="group/chapter w-full"
                  onClick={() => setOpen((value) => !value)}
                >
                  <span
                    ref={handleRef}
                    className="hidden cursor-grab touch-none group-hover/chapter:inline-flex"
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
                {scenes.map((scene, index) => (
                  <SceneOutlineItem
                    key={scene.sceneId}
                    scene={scene}
                    index={index}
                  />
                ))}
              </CollapsibleContent>
            </Collapsible>
          </div>
        </ContextMenuTrigger>

        <ChapterContextMenu
          chapterId={chapter.chapterId}
          title={chapter.title}
        />
      </ContextMenu>
    </SidebarMenuItem>
  );
}
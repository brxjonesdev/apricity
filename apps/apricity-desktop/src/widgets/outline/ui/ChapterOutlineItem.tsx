import { useState } from "react";
import { Book, BookOpen, ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/shared/components/shadcn/collapsible";
import {
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/shared/components/shadcn/sidebar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/shared/components/shadcn/context-menu";
import { Chapter } from "@/entities/chapter";
import { SceneOutline } from "@/entities/scene";
import { SceneOutlineItem } from "./SceneOutlineItem";
import OutlineContextMenu from "./OutlineContextMenu";
import EditorHelper from "@/features/set-editor-view/ui/editor-helper";

type ChapterOutlineItemProps = {
  chapter: Chapter;
  scenes: SceneOutline[];
};

export function ChapterOutlineItem({
  chapter,
  scenes,
}: ChapterOutlineItemProps) {
  const [open, setOpen] = useState(false);
   const [isContextOpen, setContextOpen] = useState(false);

  return (
   
    
    <ContextMenu onOpenChange={setContextOpen}>
  
      <SidebarMenuItem>
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger className="w-full">
            <EditorHelper id={chapter.chapterId}>
            <ContextMenuTrigger className="w-full">
              <SidebarMenuButton
                className={`w-full ${
                  isContextOpen ? "bg-accent text-accent-foreground" : ""
                }`}
              >
                <span className="text-xs">{chapter.title}</span>
    
                <ChevronRight
                  className={`ml-auto h-4 w-4 transition-transform ${
                    open ? "rotate-90" : ""
                  }`}
                />
              </SidebarMenuButton>
              </ContextMenuTrigger>
            </EditorHelper>
              
          </CollapsibleTrigger>
    
          <CollapsibleContent>
            {scenes.map((scene) => (
              <SceneOutlineItem key={scene.sceneId} scene={scene} />
            ))}
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuItem>
      <OutlineContextMenu item={chapter} type="chapter" />
    </ContextMenu>
  );
}
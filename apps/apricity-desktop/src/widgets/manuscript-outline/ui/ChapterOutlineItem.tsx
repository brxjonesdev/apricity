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
import { Scene } from "@/entities/scene";
import { SceneOutlineItem } from "./SceneOutlineItem";

type ChapterOutlineItemProps = {
  chapter: Chapter;
  scenes: Scene[];
};

export function ChapterOutlineItem({
  chapter,
  scenes,
}: ChapterOutlineItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <ContextMenu>
      <SidebarMenuItem>
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger className="w-full">
            <ContextMenuTrigger className="w-full">
              <SidebarMenuButton className="w-full">
                <span className="text-xs">{chapter.title}</span>

                <ChevronRight
                  className={`ml-auto h-4 w-4 transition-transform duration-200 ease-in-out ${
                    open ? "rotate-90" : "rotate-0"
                  }`}
                />
                
              </SidebarMenuButton>
            </ContextMenuTrigger>
          </CollapsibleTrigger>

          <CollapsibleContent>
            {scenes.map((scene) => (
              <SceneOutlineItem key={scene.sceneId} scene={scene} />
            ))}
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuItem>

      <ContextMenuContent>
        <p>Context menu for {chapter.title}</p>
        <p>This is a context menu.</p>
      </ContextMenuContent>
    </ContextMenu>
  );
}
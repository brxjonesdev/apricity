import { SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from "@/shared/components/shadcn/sidebar";
import { Scene, SceneOutline } from "@/entities/scene";
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from "@/shared/components/shadcn/context-menu";
import OutlineContextMenu from "./OutlineContextMenu";
import { useState } from "react";

type SceneOutlineItemProps = {
  scene: SceneOutline;
};

export function SceneOutlineItem({ scene }: SceneOutlineItemProps) {
  const [contextOpen, setContextOpen] = useState(false);

  return (
    <ContextMenu onOpenChange={setContextOpen}>
      <SidebarMenuSub>
        <ContextMenuTrigger>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton
              className={contextOpen ? "bg-accent text-accent-foreground" : ""}
            >
              <span className="text-xs">{scene.title}</span>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        </ContextMenuTrigger>
      </SidebarMenuSub>
      <OutlineContextMenu item={scene} type="scene" />
    </ContextMenu>
  );
}
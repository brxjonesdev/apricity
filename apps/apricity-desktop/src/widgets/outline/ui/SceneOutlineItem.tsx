import { SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from "@/shared/components/shadcn/sidebar";
import { Scene, SceneOutline } from "@/entities/scene";
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from "@/shared/components/shadcn/context-menu";
import OutlineContextMenu from "./OutlineContextMenu";
import { useState } from "react";
import EditorHelper from "@/features/set-editor-view/ui/editor-helper";

type SceneOutlineItemProps = {
  scene: SceneOutline;
};

export function SceneOutlineItem({ scene }: SceneOutlineItemProps) {
  const [contextOpen, setContextOpen] = useState(false);

  return (
    <ContextMenu onOpenChange={setContextOpen}>
      <SidebarMenuSub>
        <ContextMenuTrigger>
          <EditorHelper id={scene.sceneId}>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton
              className={contextOpen ? "bg-accent text-accent-foreground" : ""}
            >
              <span className="text-xs">{scene.title}</span>
            </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </EditorHelper>
          </ContextMenuTrigger>
      </SidebarMenuSub>
      <OutlineContextMenu item={scene} type="scene" />
    </ContextMenu>
  );
}
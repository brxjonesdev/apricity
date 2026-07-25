import { SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from "@/shared/components/shadcn/sidebar";
import { Scene, SceneOutline } from "@/entities/scene";
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from "@/shared/components/shadcn/context-menu";

type SceneOutlineItemProps = {
  scene: SceneOutline;
};

export function SceneOutlineItem({ scene }: SceneOutlineItemProps) {
  return (
    <ContextMenu>
      <SidebarMenuSub>
        <ContextMenuTrigger>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton>
              <span className="text-xs">{scene.title}</span>   
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        </ContextMenuTrigger>
      </SidebarMenuSub>
      <ContextMenuContent>
        {/* TODO: Add context menu for scene */}
        {/*<SceneContextMenu scene={scene} />*/}
      </ContextMenuContent>
    </ContextMenu>
  );
}
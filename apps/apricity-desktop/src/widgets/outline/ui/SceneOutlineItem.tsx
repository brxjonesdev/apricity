import {
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/shared/components/shadcn/sidebar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/shared/components/shadcn/context-menu";
import { SceneOutline } from "@/entities/scene";
import EditorHelper from "@/features/set-editor-view/ui/editor-helper";
import { SceneContextMenu } from "./SceneContextMenu";
type SceneOutlineItemProps = {
  scene: SceneOutline;
  index: number;
  scenes: SceneOutline[];
};

export function SceneOutlineItem({
  scene,
  index,
  scenes,
}: SceneOutlineItemProps) {
  return (
    <SidebarMenuSub>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <SidebarMenuSubItem>
            <EditorHelper id={scene.sceneId} type="scene">
              <SidebarMenuSubButton className="cursor-pointer hover:bg-accent hover:text-accent-foreground">
                <span className="truncate text-xs">
                  {scene.title}
                </span>
              </SidebarMenuSubButton>
            </EditorHelper>
          </SidebarMenuSubItem>
        </ContextMenuTrigger>

        <SceneContextMenu
          scene={scene}
          index={index}
          scenes={scenes}
        />
      </ContextMenu>
    </SidebarMenuSub>
  );
}
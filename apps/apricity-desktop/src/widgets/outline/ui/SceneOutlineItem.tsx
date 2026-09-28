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

type SceneOutlineItemProps = {
  scene: SceneOutline;
  index: number;
};

export function SceneOutlineItem({
  scene,
  index,
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

        <ContextMenuContent>
          <ContextMenuItem>
            Move Up
          </ContextMenuItem>

          <ContextMenuItem>
            Move Down
          </ContextMenuItem>

          <ContextMenuSeparator />

          <ContextMenuSub>
            <ContextMenuSubTrigger>
              Move to
            </ContextMenuSubTrigger>

            <ContextMenuSubContent>
              <ContextMenuItem>
                Chapter 1
              </ContextMenuItem>

              <ContextMenuItem>
                Chapter 2
              </ContextMenuItem>

              <ContextMenuItem>
                Chapter 3
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>

          <ContextMenuSeparator />

          <ContextMenuItem className="text-destructive focus:text-destructive">
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </SidebarMenuSub>
  );
}
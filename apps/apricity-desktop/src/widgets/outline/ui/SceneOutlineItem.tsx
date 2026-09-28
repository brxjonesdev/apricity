import {
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/shared/components/shadcn/sidebar";
import { SceneOutline } from "@/entities/scene";
import EditorHelper from "@/features/set-editor-view/ui/editor-helper";

type SceneOutlineItemProps = {
  scene: SceneOutline;
  index: number;
};

export function SceneOutlineItem({
  scene,
}: SceneOutlineItemProps) {
  return (
    <SidebarMenuSub>
      <EditorHelper id={scene.sceneId} type="scene">
        <SidebarMenuSubItem>
          <SidebarMenuSubButton className="hover:bg-accent hover:text-accent-foreground cursor-pointer">
            <span className="text-xs truncate">
              {scene.title}
            </span>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      </EditorHelper>
    </SidebarMenuSub>
  );
}
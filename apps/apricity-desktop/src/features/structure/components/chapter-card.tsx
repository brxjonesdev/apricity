import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/shared/components/shadcn/sidebar";
import { ChapterWithScenes } from "../types";
import { useNavigationStore } from "@/shared/context/NavigationStore";

export default function ChapterCard({
  chapter,
}: {
  chapter: ChapterWithScenes;
}) {
  const { navigateTo } = useNavigationStore();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton onClick={() => navigateTo("editor")}>
        {chapter.title}
      </SidebarMenuButton>

      <SidebarMenuSub>
        {chapter.scenes.map((scene) => (
          <SidebarMenuSubItem key={scene.id}>
            <SidebarMenuSubButton>{scene.title}</SidebarMenuSubButton>
          </SidebarMenuSubItem>
        ))}
      </SidebarMenuSub>
    </SidebarMenuItem>
  );
}

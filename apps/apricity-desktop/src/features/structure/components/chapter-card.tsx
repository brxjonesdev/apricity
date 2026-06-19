import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/shared/components/shadcn/sidebar";

import { useNavigationStore } from "@/shared/lib/context/NavigationStore";
import { ChapterDTO } from "../structure.dto";

export default function ChapterCard({ chapter }: { chapter: ChapterDTO }) {
  const { navigateTo } = useNavigationStore();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton onClick={() => navigateTo("editor")}>
        {chapter.title}
      </SidebarMenuButton>

      <SidebarMenuSub>
        {(chapter.scenes ?? []).map((scene) => (
          <SidebarMenuSubItem key={scene.id}>
            <SidebarMenuSubButton>{scene.title}</SidebarMenuSubButton>
          </SidebarMenuSubItem>
        ))}
      </SidebarMenuSub>
    </SidebarMenuItem>
  );
}

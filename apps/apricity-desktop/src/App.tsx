import { ApricityAppHeader } from "./components/layout/app-header";
import { ApricityAppSidebar } from "./components/layout/app-sidebar";
import { useStories } from "./features/library/hooks/useStories";
import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
} from "@/shared/components/shadcn/sidebar";
import { useNavigationStore } from "./shared/context/NavigationStore";
import OutlineView from "./features/outline/components/outline-view";
const VIEWS = {
  editor: <div>Editor</div>,
  outline: <OutlineView />,
  characters: <div>Charcters</div>,
  world: <div>World</div>,
} as const;
export default function ApricityApp() {
  const { view } = useNavigationStore();
  const CurrentView = VIEWS[view] ?? VIEWS.editor;

  return (
    <section className="h-dvh [--header-height:calc(--spacing(16))]">
      <SidebarProvider className="flex flex-col">
        <ApricityAppHeader />
        <div className="flex flex-1">
          <ApricityAppSidebar />
          <SidebarInset>
            <div className="flex flex-1">{CurrentView}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </section>
  );
}

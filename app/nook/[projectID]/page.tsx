import { getServices } from "@/lib/services/index";
import { SidebarProvider, SidebarInset } from "@/lib/components/ui/sidebar";
import { ProjectProvider } from "@/lib/contexts/projectsContext";
import FileNavigation from "./_components/file-navigation/file-navigation";
import AppHeader from "./_components/app-header";
import ContentEditor from "./_components/editor/content-editor";

export default async function ProjectPage({
  params,
}: {
  params: { projectID: string };
}) {
  const { projectID } = await params;
  const { projectService, manuscriptService } = await getServices();

  // Fetch project and manuscripts in parallel
  const [projectResult, manuscriptsResult] = await Promise.all([
    projectService.getById(projectID),
    manuscriptService.getFullManuscriptsByID(projectID),
  ]);

  if (!projectResult.ok || !manuscriptsResult.ok) {
    return <div>Failed to load project data.</div>;
  }

  return (
    <ProjectProvider
      initialData={{
        project: projectResult.data,
        manuscripts: manuscriptsResult.data,
      }}
    >
      <SidebarProvider
        style={{ "--sidebar-width": "300px" } as React.CSSProperties}
      >
        <FileNavigation />
        <SidebarInset>
          <AppHeader />
          <ContentEditor />
        </SidebarInset>
      </SidebarProvider>
    </ProjectProvider>
  );
}

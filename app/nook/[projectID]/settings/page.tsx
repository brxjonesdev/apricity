import { ProjectProvider, useProject } from "@/lib/contexts/projectsContext";
import { getServices } from "@/lib/services";
import SettingsMenu from "./_components/settings-menu";

export default async function SettingsPage({
  params,
}: {
  params: { projectID: string };
}) {
  const { projectID } = await params;
  const { projectService } = await getServices();

  const projectResult = await projectService.getById(projectID);

  if (!projectResult.ok) {
    return <div>Failed to load project data.</div>;
  }
  return (
    <ProjectProvider
      initialData={{
        project: projectResult.data,
      }}
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Project Settings</h1>
        <p className="mb-2">
          <strong>Project Name:</strong> {projectResult.data.name}
        </p>
        <p className="mb-2">
          <strong>Project Blurb:</strong> {projectResult.data.blurb}
        </p>
        {/* Additional settings components can be added here */}
      </div>
      <SettingsMenu />
    </ProjectProvider>
  );
}

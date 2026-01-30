import { getServices } from "@/lib/services/index"
import WorkspaceWrapper from "./_components/workspace-wrapper";

export default async function ProjectPage({params}: {params: {projectID: string}}) {
  const {
    manuscriptService,
  } = await getServices();
  const { projectID } = await params;

  const projectsData = await manuscriptService.getFullProjectData(projectID);

  if (!projectsData.ok) {
    return <div>Error loading project: {projectsData.error}</div>;
  }
  const project = projectsData.data;
  console.log("Project Data:", project);
  return <WorkspaceWrapper initialProjectData={project} />;
}

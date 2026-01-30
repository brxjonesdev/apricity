import { getServices } from "@/lib/services"
import { ProjectsListClient } from "./projects-list-client"
import { revalidatePath } from "next/cache"

interface ProjectsListWrapperProps {
  userId: string
}

export async function ProjectsListWrapper({ userId }: ProjectsListWrapperProps) {
  const { manuscriptService } = await getServices()
  const projectsData = await manuscriptService.getProjectsByUser(userId)

  if (!projectsData.ok) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
        <p className="text-sm text-destructive">Error loading projects: {projectsData.error}</p>
      </div>
    )
  }

  const projects = projectsData.data

  async function deleteProject(projectId: string) {
    "use server"
    const { manuscriptService } = await getServices()
    const result = await manuscriptService.deleteProject(projectId)
    if (result.ok) {
      revalidatePath("/start")
    }
  }

  return <ProjectsListClient projects={projects} onDelete={deleteProject} />
}

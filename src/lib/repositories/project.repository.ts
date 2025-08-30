import { nanoid } from "nanoid";
import { AppTheme, Project, ProjectAnalytics, ProjectCreate, ProjectSettings, ProjectUpdate, Result, ok, err } from "../types";

export interface ProjectRepository {
  createProject(data: ProjectCreate): Promise<Result<Project, string>>;
  getProjectById(id: string): Promise<Result<Project, string>>;
  getAllProjects(): Promise<Result<Project[], string>>;
  updateProject(id: string, data: ProjectUpdate): Promise<Result<Project, string>>;
  deleteProject(id: string): Promise<Result<boolean, string>>;
  findProjects(query: string): Promise<Result<Project[], string>>;
  findRecentlyOpened(): Promise<Result<Project[], string>>;
  updateProjectSettings(id: string, settings: ProjectSettings): Promise<Result<Project, string>>;
  viewAnalytics(id: string): Promise<Result<ProjectAnalytics, string>>;
  editAppTheme(id: string, theme: AppTheme): Promise<Result<Project, string>>;
  editEditorSettings(id: string, settings: ProjectSettings["editorPreferences"]): Promise<Result<Project, string>>;
}

export function createInMemoryProjectRepository(): ProjectRepository {
  const projects: Project[] = []

  return {
    async createProject(data: ProjectCreate) {
      const project: Project = {
        id: `project-${nanoid(32)}`,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      projects.push(project)
      return ok(project)
    },

    async getProjectById(id: string) {
      const project = projects.find(project => project.id === id)
      return project ? ok(project) : err("Project not found")
    },

    async getAllProjects() {
      return ok([...projects])
    },

    async updateProject(id: string, data: ProjectUpdate) {
      const index = projects.findIndex(project => project.id === id)
      if (index === -1) return err("Project not found")
      const updatedProject: Project = {
        ...projects[index],
        ...data,
        updatedAt: new Date()
      }
      projects[index] = updatedProject
      return ok(updatedProject)
    },

    async deleteProject(id: string) {
      const index = projects.findIndex(project => project.id === id)
      if (index === -1) return err("Project not found")
      projects.splice(index, 1)
      return ok(true)
    },

    async findProjects(query: string) {
      const q = query.toLowerCase()
      return ok(projects.filter(project =>
        project.name.toLowerCase().includes(q) ||
        (project.blurb && project.blurb.toLowerCase().includes(q))
      ))
    },

    async findRecentlyOpened() {
      return ok(projects.filter(project => project.updatedAt && project.updatedAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)))
    },

    async updateProjectSettings(id: string, settings: ProjectSettings) {
      const result = await this.getProjectById(id)
      if (!result.ok) return err("Project not found")
      result.data.settings = settings
    const updatedProject = await this.updateProject(id, result.data)
    if (!updatedProject.ok) return err("Failed to update project settings")
    return ok(updatedProject.data)
    },

    async viewAnalytics(id: string) {
      const result = await this.getProjectById(id)
      if (!result.ok) return err("Project not found")
      return ok(result.data.analytics)
    },

    async editAppTheme(id: string, theme: AppTheme) {
      const result = await this.getProjectById(id)
      if (!result.ok) return err("Project not found")
      result.data.theme = theme
      const updatedProject = await this.updateProject(id, result.data)
      if (!updatedProject.ok) return err("Failed to update project theme")
      return ok(updatedProject.data)
    },

    async editEditorSettings(id: string, settings: ProjectSettings["editorPreferences"]) {
      const result = await this.getProjectById(id)
      if (!result.ok) return err("Project not found")
      result.data.settings.editorPreferences = settings
      const updatedProject = await this.updateProject(id, result.data)
      if (!updatedProject.ok) return err("Failed to update editor settings")
      return ok(updatedProject.data)
    }
  }
}

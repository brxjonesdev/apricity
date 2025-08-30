import { AppTheme, Project, ProjectAnalytics, ProjectCreate, ProjectSettings, ProjectUpdate } from "../types";

export interface ProjectRepository {
  createProject(data: ProjectCreate): Promise<Project>;
  getProjectById(id: string): Promise<Project | null>;
  getAllProjects(): Promise<Project[]>;
  updateProject(id: string, data: ProjectUpdate): Promise<Project | null>;
  deleteProject(id: string): Promise<boolean>;
  findProjects(query: string): Promise<Project[]>;
  findRecentlyOpened(): Promise<Project[]>;
  updateProjectSettings(id: string, settings: ProjectSettings): Promise<Project | null>;
  viewAnalytics(id: string): Promise<ProjectAnalytics | null>;
  editAppTheme(id: string, theme: AppTheme): Promise<Project | null>;
  editEditorSettings(id: string, settings: ProjectSettings["editorPreferences"]): Promise<Project | null>;
}

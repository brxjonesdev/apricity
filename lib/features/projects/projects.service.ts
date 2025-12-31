import { nanoid } from 'nanoid';
import { Project, CreateProjectDTO, UpdateProjectDTO } from './types';
import { Result, ok, err } from '@/lib/utils';
import { ProjectsRepository } from './projects.repo';

export interface ProjectsService {
  createProject(input: CreateProjectDTO): Promise<Result<Project, string>>;
  updateProject(
    id: string,
    updates: UpdateProjectDTO,
  ): Promise<Result<Project, string>>;
  deleteProject(id: string): Promise<Result<null, string>>;
  getProject(id: string): Promise<Result<Project, string>>;
  getAllProjects(): Promise<Result<Project[], string>>;
}

export function createProjectsService(
  userId: string,
  repo: ProjectsRepository,
): ProjectsService {
  if (!userId) {
    throw new Error('ProjectsService requires a userId');
  }

  return {
    async createProject(input) {
      if (!input.name) {
        return err('Project name is required');
      }

      const now = new Date();

      const project: Project = {
        id: `project-${nanoid(12)}`,
        userId,
        name: input.name,
        blurb: input.blurb || '',
        createdAt: now,
        updatedAt: now,
      };

      const created = await repo.create(project);
      return ok(created);
    },

    async updateProject(id, updates) {
      const existing = await repo.getById(id);
      if (!existing) return err('Project not found');
      if (existing.userId !== userId) return err('Unauthorized');

      const updated = await repo.update(id, updates);
      if (!updated) return err('Failed to update project');

      return ok(updated);
    },

    async deleteProject(id) {
      const existing = await repo.getById(id);
      if (!existing) return err('Project not found');
      if (existing.userId !== userId) return err('Unauthorized');

      const deleted = await repo.delete(id);
      if (!deleted) return err('Failed to delete project');

      return ok(null);
    },

    async getProject(id) {
      const project = await repo.getById(id);
      if (!project) return err('Project not found');
      if (project.userId !== userId) return err('Unauthorized');

      return ok(project);
    },

    async getAllProjects() {
      const projects = await repo.getAllByUser(userId);
      return ok(projects);
    },
  };
}

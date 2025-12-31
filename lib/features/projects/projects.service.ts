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

  function validateProjectInput(input: CreateProjectDTO | UpdateProjectDTO): string | null {
    if (input.name !== undefined) {
      if (typeof input.name !== 'string' || input.name.trim().length === 0) {
        return 'Project name must be a non-empty string';
      }
    }
    if (input.blurb !== undefined) {
      if (typeof input.blurb !== 'string') {
        return 'Project blurb must be a string';
      }
      if (input.blurb.length > 500) {
        return 'Project blurb must be less than 500 characters';
      }
    }
    return null;
  }

  return {
    async createProject(input: CreateProjectDTO) {
      const validationError = validateProjectInput(input);
      if (validationError) return err(validationError);

      const newProject: Project = {
        id: `proj_${nanoid(15)}`,
        userId,
        name: input.name,
        blurb: input.blurb,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const creationResult = await repo.create(userId, newProject);
      if(creationResult.ok){
        return ok(creationResult.data);
      }
      return err(creationResult.error);
    },

    async updateProject(id: string, updates: UpdateProjectDTO) {
      const updateErrors = validateProjectInput(updates);
      if (updateErrors) return err(updateErrors);

      const existing = await repo.getById(id);
      if (!existing) return err('Project not found');
      if (existing.userId !== userId) return err('You are not authorized to update this project');
      const updatedResult = await repo.update(id, updates);
      if (!updatedResult) return err('Failed to update project');

      return ok(updatedResult);

    },

    async deleteProject(id) {
      const existing = await repo.getById(id);
      if (!existing) return err('Project not found');
      if (existing.userId !== userId) return err('You are not authorized to delete this project');

      const deletionSuccess = await repo.delete(id);
      if (!deletionSuccess) return err('Failed to delete project');
      return ok(null);
    },

    async getProject(id) {
      if (!id) return err('Project ID is required');

      const project = await repo.getById(id);
      if (!project) return err('Project not found');
      if (project.userId !== userId) return err('You are not authorized to view this project');

      return ok(project);
    },

    async getAllProjects() {
      const projects = await repo.getAllByUser(userId);
      if (!projects) return err('Failed to retrieve projects');
      return ok(projects);
    },
  };
}

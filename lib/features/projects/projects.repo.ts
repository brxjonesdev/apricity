import { Project, CreateProjectDTO, UpdateProjectDTO } from './types';

export interface ProjectsRepository {
  create(project: Project): Promise<Project>;
  update(id: string, updates: UpdateProjectDTO): Promise<Project | null>;
  delete(id: string): Promise<boolean>;
  getById(id: string): Promise<Project | null>;
  getAllByUser(userId: string): Promise<Project[]>;
}

export function createInMemoryProjectsRepo(): ProjectsRepository {
  const store = new Map<string, Project>();

  return {
    async create(project) {
      store.set(project.id, project);
      return project;
    },

    async update(id, updates) {
      const existing = store.get(id);
      if (!existing) return null;

      const updated: Project = {
        ...existing,
        ...updates,
        updatedAt: new Date(),
      };

      store.set(id, updated);
      return updated;
    },

    async delete(id) {
      return store.delete(id);
    },

    async getById(id) {
      return store.get(id) ?? null;
    },

    async getAllByUser(userId) {
      return Array.from(store.values()).filter(
        (project) => project.userId === userId,
      );
    },
  };
}

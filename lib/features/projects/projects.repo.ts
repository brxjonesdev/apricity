
import { err, Result } from '@/lib/utils';
import { Project, CreateProjectDTO, UpdateProjectDTO } from './types';
import { ok } from '@/lib/utils';
import { db } from '@/lib/db/local/db';
import { createClient } from '../authentication/supabase/client';

export interface ProjectsRepository {
  create(user: string, project: Project): Promise<Result<Project, string>>;
  update(id: string, updates: UpdateProjectDTO): Promise<Project | null>;
  delete(id: string): Promise<boolean>;
  getById(id: string): Promise<Project | null>;
  getAllByUser(userId: string): Promise<Project[]>;
}

export function createInMemoryProjectsRepo(): ProjectsRepository {
  const supabase = createClient();

  return {
    async create(userId, project) {
      // adding to supabase
      const { error } = await supabase
        .from('projects')
        .insert([
          {
            project_id: project.id,
            user_id: userId,
            name: project.name,
            blurb: project.blurb,
            created_at: project.createdAt,
            updated_at: project.updatedAt,
          }
        ])
      if (error) {
        return err(error.message)
      }
      return ok(project);
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
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching projects:', error.message);
        return [];
      }

      // Map the fetched data to Project type
      const projects: Project[] = data.map((item) => ({
        id: item.project_id,
        userId: item.user_id,
        name: item.name,
        blurb: item.blurb,
        createdAt: new Date(item.created_at),
        updatedAt: new Date(item.updated_at),
      }));

      return projects;

    },
  };
}

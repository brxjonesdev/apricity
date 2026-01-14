
import { err, Result } from '@/lib/utils';
import { Project, UpdateProjectDTO } from './types';
import { ok } from '@/lib/utils';
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
      const { data, error } = await supabase
        .from('projects')
        .update({
          ...updates,
          updated_at: new Date(),
        })
        .eq('project_id', id)
        .select('*')
        .single();

      if (error) {
        console.error('Error updating project:', error.message);
        return null;
      }

      if (!data) {
        return null;
      }

      const updatedProject: Project = {
        id: data.project_id,
        userId: data.user_id,
        name: data.name,
        blurb: data.blurb,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
      };

      return updatedProject;
    },

    async delete(id) {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('project_id', id);

      if (error) {
        console.error('Error deleting project:', error.message);
        return false;
      }

      return true;
    },

    async getById(id) {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('project_id', id)
        .single();

      if (error) {
        console.error('Error fetching project by ID:', error.message);
        return null;
      }

      if (!data) {
        return null;
      }

      const project: Project = {
        id: data.project_id,
        userId: data.user_id,
        name: data.name,
        blurb: data.blurb,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
      };

      return project;
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

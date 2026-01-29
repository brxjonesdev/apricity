import { Database } from "@/lib/supabase/types";
import { Result, ok, err } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { nanoid } from "nanoid";

type Project = Database['public']['Tables']['projects']['Row'];
type ProjectInsert = Database['public']['Tables']['projects']['Insert'];
type ProjectUpdate = Database['public']['Tables']['projects']['Update'];

export interface ProjectsRepository {
  create(project: Omit<ProjectInsert, 'created_at' | 'updated_at' | 'project_id'>): Promise<Result<Project, string>>;
  update(id: string, updates: ProjectUpdate): Promise<Result<Project, string>>;
  delete(id: string): Promise<Result<null, string>>;
  getAllByUser(userId: string): Promise<Result<Project[], string>>;
  getByID(id: string): Promise<Result<Project, string>>;
}

export function createSupabaseProjectRepo(): ProjectsRepository {
  const supabase = createClient();

  return {
    async create(project): Promise<Result<Project, string>> {
      const { data, error } = await supabase
        .from('projects')
        .insert({
          project_id: `project-${nanoid(27)}`,
          ...project,
        })
        .select()
        .single();
      if (error) {
        return err(error.message);
      }
      return ok(data);
    },

    async update(id, updates): Promise<Result<Project, string>> {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('project_id', id)
        .select()
        .single();

      if (error) {
        return err(error.message);
      }
      return ok(data);
    },

    async delete(id): Promise<Result<null, string>> {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('project_id', id);

      if (error) {
        return err(error.message);
      }
      return ok(null);
    },
    async getAllByUser(userId): Promise<Result<Project[], string>> {
      const { data, error } = await supabase
        .from('projects')
        .select()
        .eq('user_id', userId);

      if (error) {
        return err(error.message);
      }
      return ok(data);
    },
    async getByID(id): Promise<Result<Project, string>> {
      const { data, error } = await supabase
        .from('projects')
        .select()
        .eq('project_id', id)
        .single();

      if (error) {
        return err(error.message);
      }
      return ok(data);
    },
  };
}

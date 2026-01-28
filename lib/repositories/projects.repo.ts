import { Database } from "@/lib/supabase/types";
import { Result, ok, err } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

type Project = Database['public']['Tables']['projects']['Row'];
type ProjectInsert = Database['public']['Tables']['projects']['Insert'];
type ProjectUpdate = Database['public']['Tables']['projects']['Update'];

export interface ProjectsRepository {
  create(project: Omit<ProjectInsert, 'created_at' | 'updated_at'>): Promise<Result<Project, string>>;
  update(id: string, updates: ProjectUpdate): Promise<Result<Project, string>>;
  delete(id: string): Promise<Result<null, string>>;
  getAllByUser(userId: string): Promise<Result<Project[], string>>;
}

export function createSupabaseProjectRepo(): ProjectsRepository {
  const supabase = createClient();

  return {
    async create(project): Promise<Result<Project, string>> {
      // Implementation
      return err("Not implemented");
    },

    async update(id, updates): Promise<Result<Project, string>> {
      // Implementation
      return err("Not implemented");
    },

    async delete(id): Promise<Result<null, string>> {
      // Implementation
      return err("Not implemented");
    },
    async getAllByUser(userId): Promise<Result<Project[], string>> {
      // Implementation
      return err("Not implemented");
    },
  };
}

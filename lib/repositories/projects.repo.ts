import { Database } from "@/lib/supabase/types";
import { Result, ok, err } from "@/lib/utils";
import { SupabaseClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";

type Project = Database['public']['Tables']['projects']['Row'];
type ProjectInsert = Database['public']['Tables']['projects']['Insert'];
type ProjectUpdate = Database['public']['Tables']['projects']['Update'];
type Manuscript = Database['public']['Tables']['manuscript']['Row'];
type Chapter = Database['public']['Tables']['chapter']['Row'];
type ChapterContent = Database['public']['Tables']['chapter_content']['Row'];
type Scene = Database['public']['Tables']['scene']['Row'];
type Image = Database['public']['Tables']['image']['Row'];
type ProjectData = Project & {
  manuscript: (Manuscript & {
    chapter: (Chapter & {
      chapter_content: (ChapterContent & {
        scene?: Scene | null;
        image?: Image | null;
      })[];
    })[];
  })[];
};


export interface ProjectsRepository {
  create(project: Omit<ProjectInsert, 'created_at' | 'updated_at' | 'project_id'>): Promise<Result<Project, string>>;
  update(id: string, updates: ProjectUpdate): Promise<Result<Project, string>>;
  delete(id: string): Promise<Result<null, string>>;
  getAllByUser(userId: string): Promise<Result<Project[], string>>;
  getByID(id: string): Promise<Result<Project, string>>;
  getFullProjectData(id: string): Promise<Result<ProjectData, string>>;
}

export function createSupabaseProjectRepo(supabase: SupabaseClient): ProjectsRepository {


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

    async getFullProjectData(id): Promise<Result<ProjectData, string>> {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          manuscript (
            *,
            chapter (
              *,
              chapter_content (
                *,
                scene:scene_id(*),
                image:image_id(*)
              )
            )
          )
        `)
        .eq('project_id', id)
        .single();

      if (error) {
        return err(error.message);
      }
      return ok(data);
    },

  };
}

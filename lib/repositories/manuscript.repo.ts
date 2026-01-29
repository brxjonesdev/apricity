import { Database, Tables } from "@/lib/supabase/types";
import { Result, ok, err } from "@/lib/utils";
import { SupabaseClient } from "@supabase/supabase-js";

type Manuscript = Database['public']['Tables']['manuscript']['Row'];
type ManuscriptInsert = Database['public']['Tables']['manuscript']['Insert'];
type ManuscriptUpdate = Database['public']['Tables']['manuscript']['Update'];

type ManuscriptWithChapters = Tables<"manuscript"> & {
  chapter: (Tables<"chapter"> & {
    chapter_content: (Tables<"chapter_content"> & {
      scene?: Tables<"scene"> | null
      image?: Tables<"image"> | null
    })[]
  })[]
};

export interface ManuscriptRepository {
  create(manuscript: Omit<ManuscriptInsert, 'id' | 'created_at' | 'updated_at'>): Promise<Result<Manuscript, string>>;
  update(id: number, updates: ManuscriptUpdate): Promise<Result<Manuscript, string>>;
  delete(id: number): Promise<Result<null, string>>;
  reorderManuscripts(targetPosition: number, manuscriptId: number): Promise<Result<null, string>>;
  getAllManuscriptsWithChapters(projectId: string): Promise<Result<ManuscriptWithChapters[], string>>;
  getById(id: number): Promise<Result<Manuscript, string>>;
}

export function createSupabaseManuscriptRepo(supabase: SupabaseClient): ManuscriptRepository {
  return {
    async create(manuscript): Promise<Result<Manuscript, string>> {
      const { data, error } = await supabase
        .from('manuscript')
        .insert(manuscript)
        .select()
        .single();
      if (error) {
        return err(error.message);
      }
      return ok(data);
    },
    async update(id, updates): Promise<Result<Manuscript, string>> {
      const { data, error } = await supabase
        .from('manuscript')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return err(error.message);
      }
      return ok(data);
    },
    async delete(id): Promise<Result<null, string>> {
      const { error } = await supabase
        .from('manuscript')
        .delete()
        .eq('id', id);

      if (error) {
        return err(error.message);
      }
      return ok(null);
    },

    async getAllManuscriptsWithChapters(projectId): Promise<Result<ManuscriptWithChapters[], string>> {
      // This is used to load full project data into the manuscript editor and global state.
      const { data, error } = await supabase
        .from('manuscript')
        .select(`
          *,
          chapter(
            *,
              chapter_content(
                *,
                scene:scene_id(*),
                image:image_id(*)
            )
          )
        `)
        .eq('project_id', projectId)
        .order('position', { referencedTable: 'chapter', ascending: true })
        .order('position', { referencedTable: 'chapter.chapter_content', ascending: true });

      if (error) {
        return err(error.message);
      }
      return ok(data as ManuscriptWithChapters[]);
    },
    async reorderManuscripts(targetPosition: number, manuscriptId: number): Promise<Result<null, string>> {
      const { error } = await supabase.rpc('reorder_manuscripts', {
        p_target_position: targetPosition,
        p_manuscript_id: manuscriptId,
      });

      if (error) {
        return err(error.message);
      }
      return ok(null);
    },

    async getById(id): Promise<Result<Manuscript, string>> {
      const { data, error } = await supabase
        .from('manuscript')
        .select()
        .eq('id', id)
        .single();

      if (error) {
        return err(error.message);
      }
      return ok(data);
    },
  }
}

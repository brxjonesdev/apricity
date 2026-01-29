import { Database } from "@/lib/supabase/types";
import { Result, ok, err } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

type Chapter = Database['public']['Tables']['chapter']['Row'];
type ChapterInsert = Database['public']['Tables']['chapter']['Insert'];
type ChapterUpdate = Database['public']['Tables']['chapter']['Update'];

type ChapterContent = Database['public']['Tables']['chapter_content']['Row'];
type ChapterContentInsert = Database['public']['Tables']['chapter_content']['Insert'];
type ChapterContentUpdate = Database['public']['Tables']['chapter_content']['Update'];

export interface ChapterRepository {
  create(chapter: Omit<ChapterInsert, 'id' | 'created_at' | 'updated_at'>): Promise<Result<Chapter, string>>;
  update(id: number, updates: ChapterUpdate): Promise<Result<Chapter, string>>;
  delete(id: number): Promise<Result<null, string>>;
  reorder(id: number, newPosition: number): Promise<Result<null, string>>;
  getById(id: number): Promise<Result<Chapter, string>>;

  // content management methods <3
  addContent(chapterId: number, content: Omit<ChapterContentInsert, 'id' | 'created_at' | 'updated_at'>): Promise<Result<ChapterContent, string>>;
  updateContent(id: number, updates: ChapterContentUpdate, type: 'scene' | 'image'): Promise<Result<ChapterContent, string>>;
  deleteContent(id: number): Promise<Result<null, string>>;
  reorderContent(chapterId: number, newPosition: number): Promise<Result<null, string>>;

}

export function createSupabaseChapterRepo(): ChapterRepository {
  const supabase = createClient();

  return {
    async create(chapter): Promise<Result<Chapter, string>> {
      const { data, error } = await supabase
        .from('chapter')
        .insert(chapter)
        .select()
        .single();
      if (error) {
        return err(error.message);
      }
      return ok(data);
    },
    async update(id, updates): Promise<Result<Chapter, string>> {
      const { data, error } = await supabase
        .from('chapter')
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
        .from('chapter')
        .delete()
        .eq('id', id);

      if (error) {
        return err(error.message);
      }
      return ok(null);
    },
    async reorder(id, newPosition): Promise<Result<null, string>> {
      return err("Not implemented");
    },

    async getById(id): Promise<Result<Chapter, string>> {
      const { data, error } = await supabase
        .from('chapter')
        .select()
        .eq('id', id)
        .single();

      if (error) {
        return err(error.message);
      }
      return ok(data);
    },

    // content management methods, these are for adding/updating/deleting/reordering chapter content only.
    // they do not handle scenes or images directly, just the chapter content entries that reference them.
    //
    async addContent(chapterId, content): Promise<Result<ChapterContent, string>> {
      const { data, error } = await supabase
        .from('chapter_content')
        .insert(content)
        .select()
        .single();
      if (error) {
        return err(error.message);
      }
      return ok(data);
    },
    async updateContent(id, updates): Promise<Result<ChapterContent, string>> {
      const { data, error } = await supabase
        .from('chapter_content')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return err(error.message);
      }
      return ok(data);
    },
    async deleteContent(id): Promise<Result<null, string>> {
      const { error } = await supabase
        .from('chapter_content')
        .delete()
        .eq('id', id);

      if (error) {
        return err(error.message);
      }
      return ok(null);
    },
    async reorderContent(chapterId, newPosition): Promise<Result<null, string>> {
      return err("Not implemented");
    },
  }
}

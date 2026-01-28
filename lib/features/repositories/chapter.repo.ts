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

  // content management methods <3
  addContent(chapterId: number, content: Omit<ChapterContentInsert, 'id' | 'created_at' | 'updated_at'>): Promise<Result<ChapterContent, string>>;
  updateContent(id: number, updates: ChapterContentUpdate): Promise<Result<ChapterContent, string>>;
  deleteContent(id: number): Promise<Result<null, string>>;
  reorderContent(chapterId: number, newPosition: number): Promise<Result<null, string>>;

}

export function createSupabaseChapterRepo(): ChapterRepository {
  const supabase = createClient();

  return {
    async create(chapter): Promise<Result<Chapter, string>> {
      return err("Not implemented");
    },
    async update(id, updates): Promise<Result<Chapter, string>> {
      return err("Not implemented");
    },
    async delete(id): Promise<Result<null, string>> {
      return err("Not implemented");
    },
    async reorder(id, newPosition): Promise<Result<null, string>> {
      return err("Not implemented");
    },

    async addContent(chapterId, content): Promise<Result<ChapterContent, string>> {
      return err("Not implemented");
    },
    async updateContent(id, updates): Promise<Result<ChapterContent, string>> {
      return err("Not implemented");
    },
    async deleteContent(id): Promise<Result<null, string>> {
      return err("Not implemented");
    },
    async reorderContent(chapterId, newPosition): Promise<Result<null, string>> {
      return err("Not implemented");
    },
  }
}

import { Database } from "@/lib/supabase/types";
import { Result, ok, err } from "@/lib/utils";
import { SupabaseClient } from "@supabase/supabase-js";

type Chapter = Database["public"]["Tables"]["chapter"]["Row"];
type ChapterInsert = Database["public"]["Tables"]["chapter"]["Insert"];
type ChapterUpdate = Database["public"]["Tables"]["chapter"]["Update"];

type ChapterContent = Database["public"]["Tables"]["chapter_content"]["Row"];
type ChapterContentUpdate =
  Database["public"]["Tables"]["chapter_content"]["Update"];

export interface ChapterRepository {
  create(
    chapter: Omit<ChapterInsert, "id" | "created_at" | "updated_at">,
  ): Promise<Result<Chapter, string>>;
  update(id: number, updates: ChapterUpdate): Promise<Result<Chapter, string>>;
  delete(id: number): Promise<Result<null, string>>;
  getById(id: number): Promise<Result<Chapter, string>>;
  reorderChapter(
    chapterId: number,
    targetPosition: number,
  ): Promise<Result<null, string>>;

  // content management methods <3
  addContent(
    chapterID: number,
    type: "scene" | "image",
    position?: number,
  ): Promise<Result<ChapterContent, string>>;
  updateContent(
    id: number,
    updates: ChapterContentUpdate,
    type: "scene" | "image",
  ): Promise<Result<ChapterContent, string>>;
  deleteContent(id: number): Promise<Result<null, string>>;
  getContentById(id: number): Promise<Result<ChapterContent, string>>;
  reorderContent(
    chapterID: number,
    targetPosition: number,
  ): Promise<Result<null, string>>;
}

export function createSupabaseChapterRepo(
  supabase: SupabaseClient,
): ChapterRepository {
  return {
    async create(chapter): Promise<Result<Chapter, string>> {
      const { data, error } = await supabase
        .from("chapter")
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
        .from("chapter")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return err(error.message);
      }
      return ok(data);
    },
    async delete(id): Promise<Result<null, string>> {
      const { error } = await supabase.from("chapter").delete().eq("id", id);

      if (error) {
        return err(error.message);
      }
      return ok(null);
    },

    async getById(id): Promise<Result<Chapter, string>> {
      const { data, error } = await supabase
        .from("chapter")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        return err(error.message);
      }
      return ok(data);
    },
    async reorderChapter(
      chapterId,
      targetPosition,
    ): Promise<Result<null, string>> {
      const { error } = await supabase.rpc("reorder_chapter", {
        p_chapter_id: chapterId,
        p_target_position: targetPosition,
      });

      if (error) {
        return err(error.message);
      }
      return ok(null);
    },

    // content management methods, these are for adding/updating/deleting/reordering chapter content only.
    // they do not handle scenes or images directly, just the chapter content entries that reference them.
    //
    async addContent(
      chapterId,
      type,
      position,
    ): Promise<Result<ChapterContent, string>> {
      const { data, error } = await supabase.rpc("add_content_to_chapter", {
        p_chapter_id: chapterId,
        p_content_type: type,
        p_content_position: position ?? null,
      });
      if (error) {
        return err(error.message);
      }
      return ok(data);
    },
    async updateContent(id, updates): Promise<Result<ChapterContent, string>> {
      const { data, error } = await supabase
        .from("chapter_content")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return err(error.message);
      }
      return ok(data);
    },
    async deleteContent(id): Promise<Result<null, string>> {
      const { error } = await supabase
        .from("chapter_content")
        .delete()
        .eq("id", id);

      if (error) {
        return err(error.message);
      }
      return ok(null);
    },
    async reorderContent(
      chapterID,
      targetPosition,
    ): Promise<Result<null, string>> {
      const { error } = await supabase.rpc("reorder_chapter_contents", {
        p_chapter_id: chapterID,
        p_target_position: targetPosition,
      });
      if (error) {
        return err(error.message);
      }
      return ok(null);
    },
    async getContentById(id): Promise<Result<ChapterContent, string>> {
      const { data, error } = await supabase
        .from("chapter_content")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        return err(error.message);
      }
      return ok(data);
    },
  };
}

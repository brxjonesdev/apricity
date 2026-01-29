import { Result, ok, err } from "@/lib/utils";
import { ManuscriptRepository } from "@/lib/repositories/manuscript.repo";
import { ChapterRepository } from "@/lib/repositories/chapter.repo";
import { SceneRepository } from "@/lib/repositories/scene.repo";
import { ImageRepository } from "@/lib/repositories/image.repo";
import { ProjectsRepository } from "../repositories/projects.repo";
import type { Database } from "@/lib/supabase/types";

type Manuscript = Database['public']['Tables']['manuscript']['Row'];
type ManuscriptInsert = Database['public']['Tables']['manuscript']['Insert'];
type ManuscriptWithChapters = Database['public']['Tables']['manuscript']['Row'] & {
  chapter: (Database['public']['Tables']['chapter']['Row'] & {
    chapter_content: (Database['public']['Tables']['chapter_content']['Row'] & {
      scene?: Database['public']['Tables']['scene']['Row'] | null;
      image?: Database['public']['Tables']['image']['Row'] | null;
    })[];
  })[];
};
type Chapter = Database['public']['Tables']['chapter']['Row'];
type ChapterInsert = Database['public']['Tables']['chapter']['Insert'];
type ChapterUpdate = Database['public']['Tables']['chapter']['Update'];
type Scene = Database['public']['Tables']['scene']['Row'];
type Image = Database['public']['Tables']['image']['Row'];
type ChapterContent = Database['public']['Tables']['chapter_content']['Row'];
type ChapterContentInsert = Database['public']['Tables']['chapter_content']['Insert'];
type ChapterContentUpdate = Database['public']['Tables']['chapter_content']['Update'];

export function createManuscriptService(
  manuscriptRepo: ManuscriptRepository,
  chapterRepo: ChapterRepository,
  sceneRepo: SceneRepository,
  imageRepo: ImageRepository,
  projectsRepo: ProjectsRepository,
) {
  return {
    // --- Manuscript Methods ---

    async createManuscript(data:{project_id: string; title: string; position?: number; }): Promise<Result<Manuscript, string>> {
      if (data.title.trim().length === 0) {
        return err("Title cannot be empty");
      }
      if (data.title.length > 255) {
        return err("Title cannot exceed 255 characters");
      }

      if (!data.project_id) {
        return err("Project ID is required");
      }

      const projectResult = await projectsRepo.getByID(data.project_id);
      if (!projectResult.ok || !projectResult.data) {
        return err("Project not found");
      }
      const newManuscript: ManuscriptInsert = {
        story_id: data.project_id,
        title: data.title,
        position: data.position || 0,
      }
      const manuscriptCreationResult = await manuscriptRepo.create(newManuscript);
      if (!manuscriptCreationResult.ok) {
        return err(`Failed to create manuscript: ${manuscriptCreationResult.error}`);
      }
      return ok(manuscriptCreationResult.data);
    },

    async updateManuscript(id: number, updates: { title: string }): Promise<Result<Manuscript, string>> {
      if (!id) {
        return err("Manuscript ID is required");
      }
      if (!updates.title && !updates.description) {
        return err("No updates provided");
      }
      if (updates.title.length === 0) {
        return err("Title cannot be empty");
      }
      if (updates.title && updates.title.length > 255) {
        return err("Title cannot exceed 255 characters");
      }

      const existingManuscriptResult = await manuscriptRepo.getById(id);
      if (!existingManuscriptResult.ok || !existingManuscriptResult.data) {
        return err("Manuscript not found");
      }

      const updatedManuscriptResult = await manuscriptRepo.update(id, updates);
      if (!updatedManuscriptResult.ok) {
        return err(`Failed to update manuscript: ${updatedManuscriptResult.error}`);
      }
      return ok(updatedManuscriptResult.data);
    },

    async deleteManuscript(id: number): Promise<Result<null, string>> {
      if (!id) {
        return err("Manuscript ID is required");
      }

      const existingManuscriptResult = await manuscriptRepo.getById(Number(id));
      if (!existingManuscriptResult.ok || !existingManuscriptResult.data) {
        return err("Manuscript not found");
      }

      const deletionResult = await manuscriptRepo.delete(id);
      if (!deletionResult.ok) {
        return err(`Failed to delete manuscript: ${deletionResult.error}`);
      }
      return ok(null);
    },

    // Reorder manuscripts
    async reorderManuscripts(
      projectId: string,
      manuscriptIds: string[]
    ): Promise<Result<null, string>> {
      throw new Error("Not implemented");
    },

    async getManuscriptsWithChaptersAndContent( manuscriptId: string ): Promise<Result<ManuscriptWithChapters[], string>> {
      if (!manuscriptId) {
        return err("Manuscript ID is required");
      }

      const manuscriptResult = await manuscriptRepo.getAllManuscriptsWithChapters(manuscriptId);
      if (!manuscriptResult.ok) {
        return err(`Failed to fetch project data: ${manuscriptResult.error}`);
      }
      return ok(manuscriptResult.data);
    },

    // --- Chapter Methods ---

    async createChapter(chapter: ChapterInsert): Promise<Result<Chapter, string>> {
      if (!chapter.manuscript_id) {
        return err("Manuscript ID is required");
      }
      if (chapter.title && chapter.title.length > 255) {
        return err("Chapter title cannot exceed 255 characters");
      }

      const newChapter: ChapterInsert = {
        manuscript_id: chapter.manuscript_id,
        title: chapter.title || "New Chapter",
        position: chapter.position || 0,
      };
      const chapterCreationResult = await chapterRepo.create(newChapter);
      if (!chapterCreationResult.ok) {
        return err(`Failed to create chapter: ${chapterCreationResult.error}`);
      }
      return ok(chapterCreationResult.data);
    },

    async updateChapter(updates: ChapterUpdate): Promise<Result<Chapter, string>> {
      if (!updates.id) {
        return err("Chapter ID is required");
      }
      if (updates.title && updates.title.length > 255) {
        return err("Chapter title cannot exceed 255 characters");
      }

      const existingChapterResult = await chapterRepo.getById(updates.id);
      if (!existingChapterResult.ok || !existingChapterResult.data) {
        return err("Chapter not found");
      }

      const updatedChapterResult = await chapterRepo.update(updates.id, updates);
      if (!updatedChapterResult.ok) {
        return err(`Failed to update chapter: ${updatedChapterResult.error}`);
      }
      return ok(updatedChapterResult.data);
    },

    async deleteChapter(id: number): Promise<Result<null, string>> {
      if (!id) {
        return err("Chapter ID is required");
      }

      const existingChapterResult = await chapterRepo.getById(id);
      if (!existingChapterResult.ok || !existingChapterResult.data) {
        return err("Chapter not found");
      }

      const deletionResult = await chapterRepo.delete(id);
      if (!deletionResult.ok) {
        return err(`Failed to delete chapter: ${deletionResult.error}`);
      }
      return ok(null);
    },

    // Reorder chapters
    async reorderChapters(
      manuscriptId: string,
      chapterIds: string[]
    ): Promise<Result<null, string>> {
      throw new Error("Not implemented");
    },

    // --- Manage chapter contents (add, update, delete, reorder) ---

    // Add content (scene or image) to chapter
    async addContentToChapter(data:ChapterContentInsert): Promise<Result<ChapterContent, string>> {

    },

    // Update content (scene or image) in chapter
    async updateChapterContent(
      id: string,
      updates: {
        scene_id?: string;
        image_id?: string;
      }
    ): Promise<Result<ChapterContent, string>> {
      throw new Error("Not implemented");
    },

    // Delete content from chapter
    async deleteChapterContent(id: string): Promise<Result<null, string>> {
      throw new Error("Not implemented");
    },

    // Reorder contents within chapter
    async reorderChapterContents(
      chapterId: string,
      contentIds: string[]
    ): Promise<Result<null, string>> {
      throw new Error("Not implemented");
    },

    // --- Scene Methods ---

    // Create a new scene
    async createScene(data: {
      title?: string;
      content: string;
      word_count?: number;
    }): Promise<Result<Scene, string>> {
      throw new Error("Not implemented");
    },

    // Update scene details
    async updateScene(
      id: string,
      updates: {
        title?: string;
        content?: string;
        word_count?: number;
      }
    ): Promise<Result<Scene, string>> {
      throw new Error("Not implemented");
    },

    // Delete a scene
    async deleteScene(id: string): Promise<Result<null, string>> {
      throw new Error("Not implemented");
    },

    // --- Image Methods ---

    // Create a new image
    async createImage(data: {
      url: string;
      alt_text?: string;
      caption?: string;
    }): Promise<Result<Image, string>> {
      throw new Error("Not implemented");
    },

    // Update image details
    async updateImage(
      id: string,
      updates: {
        url?: string;
        alt_text?: string;
        caption?: string;
      }
    ): Promise<Result<Image, string>> {
      throw new Error("Not implemented");
    },

    // Delete an image
    async deleteImage(id: string): Promise<Result<null, string>> {
      throw new Error("Not implemented");
    },
  };
}

export type ManuscriptService = ReturnType<typeof createManuscriptService>;

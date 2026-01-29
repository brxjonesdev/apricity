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
type SceneInsert = Database['public']['Tables']['scene']['Insert'];
type SceneUpdate = Database['public']['Tables']['scene']['Update'];
type Image = Database['public']['Tables']['image']['Row'];
type ImageInsert = Database['public']['Tables']['image']['Insert'];
type ImageUpdate = Database['public']['Tables']['image']['Update'];
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

    async reorderManuscripts(targetPosition: number,manuscriptId: number): Promise<Result<null, string>> {
      if (targetPosition === undefined || targetPosition === null) {
        return err("Target position is required");
      }
      if (!manuscriptId) {
        return err("Manuscript ID is required");
      }

      const reorderResult = await manuscriptRepo.reorder(manuscriptId, targetPosition);
      if (!reorderResult.ok) {
        return err(`Failed to reorder manuscripts: ${reorderResult.error}`);
      }
      return ok(null);
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

    async reorderChapters( manuscriptId: number, targetPosition: number): Promise<Result<null, string>> {
      if (!manuscriptId) {
        return err("Manuscript ID is required");
      }
      if (targetPosition === undefined || targetPosition === null) {
        return err("Target position is required");
      }

      const reorderResult = await chapterRepo.reorder(manuscriptId, targetPosition);
      if (!reorderResult.ok) {
        return err(`Failed to reorder chapters: ${reorderResult.error}`);
      }
      return ok(null);
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

    async deleteChapterContent(id: number): Promise<Result<null, string>> {
      const existingChapterResult = await chapterRepo.getContentById(id);
      if (!existingChapterResult.ok || !existingChapterResult.data) {
        return err("Chapter content not found");
      }

      const deletionResult = await chapterRepo.deleteContent(id);
      if (!deletionResult.ok) {
        return err(`Failed to delete chapter content: ${deletionResult.error}`);
      }
      return ok(null);
    },

    // Reorder contents within chapter
    async reorderChapterContents(
      chapterId: string,
      contentIds: string[]
    ): Promise<Result<null, string>> {
      throw new Error("Not implemented");
    },

    // --- Scene Methods ---
    async createScene(data: SceneInsert): Promise<Result<Scene, string>> {
      if (!data.content || data.content === null) {
        return err("Scene content is required");
      }
      const newScene: SceneInsert = {
        content: data.content || "",
      };
      const sceneCreationResult = await sceneRepo.create(newScene);
      if (!sceneCreationResult.ok) {
        return err(`Failed to create scene: ${sceneCreationResult.error}`);
      }
      return ok(sceneCreationResult.data);
    },

    async updateScene( id: number, updates: SceneUpdate): Promise<Result<Scene, string>> {
      const existingSceneResult = await sceneRepo.getById(id);
      if (!existingSceneResult.ok || !existingSceneResult.data) {
        return err("Scene not found");
      }

      const updatedSceneResult = await sceneRepo.update(id, updates);
      if (!updatedSceneResult.ok) {
        return err(`Failed to update scene: ${updatedSceneResult.error}`);
      }
      return ok(updatedSceneResult.data);
    },

    async deleteScene(id: number): Promise<Result<null, string>> {
      const existingSceneResult = await sceneRepo.getById(id);
      if (!existingSceneResult.ok || !existingSceneResult.data) {
        return err("Scene not found");
      }

      const deletionResult = await sceneRepo.delete(id);
      if (!deletionResult.ok) {
        return err(`Failed to delete scene: ${deletionResult.error}`);
      }
      return ok(null);
    },

    // --- Image Methods ---
    async createImage(data: { url: string; alt_text?: string; caption?: string; }): Promise<Result<Image, string>> {
      if (!data.url || data.url.trim().length === 0) {
        return err("Image URL is required");
      }

      const newImage: ImageInsert = {
        url: data.url,
        alt_text: data.alt_text || "",
      }
      const imageCreationResult = await imageRepo.create(newImage);
      if (!imageCreationResult.ok) {
        return err(`Failed to create image: ${imageCreationResult.error}`);
      }
      return ok(imageCreationResult.data);
    },

    async updateImage( id: number, updates: { url?: string; alt_text?: string; caption?: string;}): Promise<Result<Image, string>> {
      const existingImageResult = await imageRepo.getById(id);
      if (!existingImageResult.ok || !existingImageResult.data) {
        return err("Image not found");
      }

      const updatedImageResult = await imageRepo.update(id, updates);
      if (!updatedImageResult.ok) {
        return err(`Failed to update image: ${updatedImageResult.error}`);
      }
      return ok(updatedImageResult.data);
    },

    async deleteImage(id: number): Promise<Result<null, string>> {
      const existingImageResult = await imageRepo.getById(id);
      if (!existingImageResult.ok || !existingImageResult.data) {
        return err("Image not found");
      }

      const deletionResult = await imageRepo.delete(id);
      if (!deletionResult.ok) {
        return err(`Failed to delete image: ${deletionResult.error}`);
      }
      return ok(null);
    },
  };
}

export type ManuscriptService = ReturnType<typeof createManuscriptService>;

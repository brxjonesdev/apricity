import { Result, ok, err } from "@/lib/utils";
import { ManuscriptRepository } from "@/lib/repositories/manuscript.repo";
import { ChapterRepository } from "@/lib/repositories/chapter.repo";
import { SceneRepository } from "@/lib/repositories/scene.repo";
import { ImageRepository } from "@/lib/repositories/image.repo";
import { ProjectsRepository } from "../repositories/projects.repo";
import type { Database } from "@/lib/supabase/types";

export type Manuscript = Database['public']['Tables']['manuscript']['Row'];
export type ManuscriptInsert = Database['public']['Tables']['manuscript']['Insert'];
export type ManuscriptWithChapters = Database['public']['Tables']['manuscript']['Row'] & {
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
type ChapterContent = Database['public']['Tables']['chapter_content']['Row'];
export type Project = Database['public']['Tables']['projects']['Row'];
export type ProjectInsert = Database['public']['Tables']['projects']['Insert'];
export type ProjectUpdate = Database['public']['Tables']['projects']['Update'];
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
export function createManuscriptService(
  manuscriptRepo: ManuscriptRepository,
  chapterRepo: ChapterRepository,
  sceneRepo: SceneRepository,
  imageRepo: ImageRepository,
  projectsRepo: ProjectsRepository,
) {
  return {
    // --- Project Methods ---
    async createProject(data: {
      name: string;
      blurb?: string;
      user_id: string;
    }): Promise<Result<Project, string>> {
      if (!data.name || data.name.trim().length === 0) {
        return err("Project name is required");
      }
      if (data.name.length > 255) {
        return err("Project name cannot exceed 255 characters");
      }
      if (data.blurb && data.blurb.length > 500) {
        return err("Project blurb cannot exceed 500 characters");
      }
      if (!data.user_id) {
        return err("User ID is required");
      }

      const newProject = {
        name: data.name,
        blurb: data.blurb || "",
        user_id: data.user_id,
      };
      const projectCreationResult = await projectsRepo.create(newProject);
      if (!projectCreationResult.ok) {
        return err(`Failed to create project: ${projectCreationResult.error}`);
      }
      return ok(projectCreationResult.data);
    },

    async deleteProject(projectId: string): Promise<Result<null, string>> {
      if (!projectId) {
        return err("Project ID is required");
      }

      const existingProjectResult = await projectsRepo.getByID(projectId);
      if (!existingProjectResult.ok || !existingProjectResult.data) {
        return err("Project not found");
      }

      const deletionResult = await projectsRepo.delete(projectId);
      if (!deletionResult.ok) {
        return err(`Failed to delete project: ${deletionResult.error}`);
      }
      return ok(null);
    },
    async getProjectsByUser(userID: string): Promise<Result<Project[], string>> {
      if (!userID) {
        return err("User ID is required");
      }

      const projectsResult = await projectsRepo.getAllByUser(userID);
      if (!projectsResult.ok) {
        return err(`Failed to fetch projects: ${projectsResult.error}`);
      }
      return ok(projectsResult.data);
    },

    async getFullProjectData(projectId: string): Promise<Result<ProjectData, string>> {
      if (!projectId) {
        return err("Project ID is required");
      }

      const projectResult = await projectsRepo.getFullProjectData(projectId);
      if (!projectResult.ok) {
        return err(`Failed to fetch project data: ${projectResult.error}`);
      }
      return ok(projectResult.data);
    },


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
      if (!updates.title) {
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

    async reorderManuscripts(targetPosition: number, manuscriptId: number): Promise<Result<null, string>> {
      if (targetPosition === undefined || targetPosition === null) {
        return err("Target position is required");
      }
      if (!manuscriptId) {
        return err("Manuscript ID is required");
      }
      const reorderResult = await manuscriptRepo.reorderManuscripts(targetPosition, manuscriptId);
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

    async reorderChapters( chapterId: number, targetPosition: number): Promise<Result<null, string>> {
      if (!chapterId) {
        return err("Manuscript ID is required");
      }
      if (targetPosition === undefined || targetPosition === null) {
        return err("Target position is required");
      }
      const reorderResult = await chapterRepo.reorderChapter(chapterId, targetPosition);
      if (!reorderResult.ok) {
        return err(`Failed to reorder chapters: ${reorderResult.error}`);
      }
      return ok(null);
    },

    // --- Manage chapter contents (add, update, delete, reorder) ---
    //
    async addContentToChapter(chapterID: number, type: 'scene' | 'image', position?: number): Promise<Result<ChapterContent, string>> {
     if (!chapterID) {
        return err("Chapter ID is required");
      }
      if (type !== 'scene' && type !== 'image') {
        return err("Invalid content type");
      }

      const addContentResult = await chapterRepo.addContent(chapterID, type, position);
      if (!addContentResult.ok) {
        return err(`Failed to add content to chapter: ${addContentResult.error}`);
      }
      return ok(addContentResult.data);
    },

    async reorderChapterContents(chapterID: number, targetPosition: number): Promise<Result<null, string>> {
      if (!chapterID) {
        return err("Chapter ID is required");
      }
      if (targetPosition === undefined || targetPosition === null) {
        return err("Target position is required");
      }
      const reorderResult = await chapterRepo.reorderContent(chapterID, targetPosition);
      if (!reorderResult.ok) {
        return err(`Failed to reorder chapter contents: ${reorderResult.error}`);
      }
      return ok(null);
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

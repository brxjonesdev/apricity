import { Result, ok, err } from "@/lib/utils";
import { ManuscriptRepository } from "@/lib/repositories/manuscript.repo";
import { ChapterRepository } from "@/lib/repositories/chapter.repo";
import { SceneRepository } from "@/lib/repositories/scene.repo";
import { ImageRepository } from "@/lib/repositories/image.repo";
import { ProjectsRepository } from "../repositories/projects.repo";
import type { Database } from "@/lib/supabase/types";
import { UserRepository } from "../repositories/user.repo";
import { title } from "node:process";

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
type Scene = Database['public']['Tables']['scene']['Row'];
type Image = Database['public']['Tables']['image']['Row'];
type ChapterContent = Database['public']['Tables']['chapter_content']['Row'];

export function createManuscriptService(
  manuscriptRepo: ManuscriptRepository,
  chapterRepo: ChapterRepository,
  sceneRepo: SceneRepository,
  imageRepo: ImageRepository,
  projectsRepo: ProjectsRepository,
  userRepo: UserRepository
) {
  return {
    // --- Manuscript Methods ---

    // Create a new manuscript
    async createManuscript(data: {
      project_id: string;
      title: string;
      position?: number;
    }): Promise<Result<Manuscript, string>> {
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

    // Update manuscript details
    async updateManuscript(
      id: string,
      updates: {
        title?: string;
        description?: string;
      }
    ): Promise<Result<Manuscript, string>> {
      throw new Error("Not implemented");
    },

    // Delete a manuscript
    async deleteManuscript(id: string): Promise<Result<null, string>> {
      throw new Error("Not implemented");
    },

    // Reorder manuscripts
    async reorderManuscripts(
      projectId: string,
      manuscriptIds: string[]
    ): Promise<Result<null, string>> {
      throw new Error("Not implemented");
    },

    // Get all manuscripts with chapters with contents
    async getManuscriptWithChapters(
      manuscriptId: string
    ): Promise<Result<ManuscriptWithChapters, string>> {
      throw new Error("Not implemented");
    },

    // --- Chapter Methods ---

    // Create a new chapter
    async createChapter(data: {
      manuscript_id: string;
      title: string;
      description?: string;
    }): Promise<Result<Chapter, string>> {
      throw new Error("Not implemented");
    },

    // Update chapter details
    async updateChapter(
      id: string,
      updates: {
        title?: string;
        description?: string;
      }
    ): Promise<Result<Chapter, string>> {
      throw new Error("Not implemented");
    },

    // Delete a chapter
    async deleteChapter(id: string): Promise<Result<null, string>> {
      throw new Error("Not implemented");
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
    async addContentToChapter(data: {
      chapter_id: string;
      content_type: 'scene' | 'image';
      scene_id?: string;
      image_id?: string;
    }): Promise<Result<ChapterContent, string>> {
      throw new Error("Not implemented");
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

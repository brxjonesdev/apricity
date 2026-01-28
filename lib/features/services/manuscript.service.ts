import { Result, ok, err } from "@/lib/utils";
import { ManuscriptRepository } from "@/lib/features/repositories/manuscript.repo";
import { ChapterRepository } from "@/lib/features/repositories/chapter.repo";
import { SceneRepository } from "@/lib/features/repositories/scene.repo";
import { ImageRepository } from "@/lib/features/repositories/image.repo";
import { ProjectsRepository } from "../repositories/projects.repo";
import type { Database } from "@/lib/supabase/types";

type Manuscript = Database['public']['Tables']['manuscript']['Row'];
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
) {
  return {
    async createManuscript(manuscript: Omit<Manuscript, 'id' | 'created_at' | 'updated_at'>): Promise<Result<Manuscript, string>> {
      return err("Not implemented");
    },
  }

}
export type ManuscriptService = ReturnType<typeof createManuscriptService>;

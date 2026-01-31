import { createSupabaseChapterRepo } from "./chapter.repo";
import { createSupabaseImageRepo } from "./image.repo";
import { createSupabaseManuscriptRepo } from "./manuscript.repo";
import { createSupabaseSceneRepo } from "./scene.repo";
import { createSupabaseProjectRepo } from "./projects.repo";
import { SupabaseClient } from "@supabase/supabase-js";

export default function createRepositories(supabase: SupabaseClient) {
  return {
    chapterRepo: createSupabaseChapterRepo(supabase),
    imageRepo: createSupabaseImageRepo(supabase),
    manuscriptRepo: createSupabaseManuscriptRepo(supabase),
    sceneRepo: createSupabaseSceneRepo(supabase),
  };
}

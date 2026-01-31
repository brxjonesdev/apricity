// services/index.ts
import { createClient } from "@/lib/supabase/server";
import createRepositories from "../repositories";
import { createManuscriptService } from "./manuscript.service";
import { createUserRepo } from "../repositories/user.repo";
import { createUserService } from "./user.service";
import { createSupabaseProjectRepo } from "../repositories/projects.repo";
import { createProjectsService } from "./projects.service";

export async function getServices() {
  const supabase = await createClient();
  const manuscriptRepos = createRepositories(supabase);
  const userRepos = createUserRepo(supabase);
  const projectRepo = createSupabaseProjectRepo(supabase);

  return {
    manuscriptService: createManuscriptService(
      manuscriptRepos.manuscriptRepo,
      manuscriptRepos.chapterRepo,
      manuscriptRepos.sceneRepo,
      manuscriptRepos.imageRepo,
      projectRepo,
    ),
    userService: createUserService(userRepos),
    projectService: createProjectsService(projectRepo),
  };
}

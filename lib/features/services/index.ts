import createSupabaseRepositories from "../repositories";
import { createManuscriptService } from "./manuscript.service";

const repos = createSupabaseRepositories();
export const manuscriptService = createManuscriptService(
  repos.manuscriptRepo,
  repos.chapterRepo,
  repos.sceneRepo,
  repos.imageRepo,
  repos.projectRepo,
)

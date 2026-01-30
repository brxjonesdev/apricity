// services/index.ts
import { createClient } from '@/lib/supabase/server'
import createRepositories from '../repositories'
import { createManuscriptService } from './manuscript.service'
import { createUserRepo } from '../repositories/user.repo';
import { createUserService } from './user.service';

export async function getServices() {
  const supabase = await createClient();
  const manuscriptRepos = createRepositories(supabase);
  const userRepos = createUserRepo(supabase);

  return {
    manuscriptService: createManuscriptService(
      manuscriptRepos.manuscriptRepo,
      manuscriptRepos.chapterRepo,
      manuscriptRepos.sceneRepo,
      manuscriptRepos.imageRepo,
      manuscriptRepos.projectRepo,
    ),
    userService: createUserService(userRepos),
  }
}

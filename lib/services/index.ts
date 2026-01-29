// services/index.ts
import { createClient } from '@/lib/supabase/server'
import createRepositories from '../repositories'
import { createManuscriptService } from './manuscript.service'

export async function getServices() {
  const supabase = await createClient();
  const repos = createRepositories(supabase);

  return {
    manuscriptService: createManuscriptService(
      repos.manuscriptRepo,
      repos.chapterRepo,
      repos.sceneRepo,
      repos.imageRepo,
      repos.projectRepo,
    )
  }
}


import { createProjectsService } from './projects.service';
import { createInMemoryProjectsRepo } from './projects.repo';

export const createProjectService = (userID: string) => {
  const projectsRepo = createInMemoryProjectsRepo();
  return createProjectsService(userID, projectsRepo);
}

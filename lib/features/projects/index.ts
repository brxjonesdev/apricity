import { createProjectsService } from './projects.service';
import { createInMemoryProjectsRepo } from './projects.repo';

export const projectsService = createProjectsService(
  'user-123',
  createInMemoryProjectsRepo(),
);

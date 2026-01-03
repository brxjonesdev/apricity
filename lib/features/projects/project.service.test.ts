import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createProjectsService, ProjectsService } from './projects.service';
import { ProjectsRepository } from './projects.repo';
import { Project } from './types';
import { err, ok} from '@/lib/utils';

describe('ProjectsService', () => {
  const USER_ID = 'user-123';
  let repo: ProjectsRepository;
  beforeEach(() => {
    repo = {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      getById: vi.fn(),
      getAllByUser: vi.fn(),
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  /* ---------------------------------- */
  /* Construction / Invariants           */
  /* ---------------------------------- */

  it('throws if userId is missing', () => {
    expect(() =>
      createProjectsService('', repo)
    ).toThrow('ProjectsService requires a userId');
  });

  /* ---------------------------------- */
  /* createProject                      */
  /* ---------------------------------- */

  it('rejects empty project name', async () => {
    const service = createProjectsService(USER_ID, repo);

    const result = await service.createProject({
      userId: USER_ID,
      name: '',
    });

    expect(result.ok).toBe(false);
    expect(repo.create).not.toHaveBeenCalled();
  });

  it('returns error when repo.create fails', async () => {
    const service = createProjectsService(USER_ID, repo);
    vi.mocked(repo.create).mockResolvedValueOnce(
      err("Failed to create project")
    );

    const result = await service.createProject({
      userId: USER_ID,
      name: 'Test Project',
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe('Failed to create project');
    }
  });

  /* ---------------------------------- */
  /* updateProject                      */
  /* ---------------------------------- */

  it('rejects update if project does not exist', async () => {
    const service = createProjectsService(USER_ID, repo);
    vi.mocked(repo.getById).mockResolvedValueOnce(null);

    const result = await service.updateProject('proj-1', {
      name: 'New Name',
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe('Project not found');
    }
  });

  it('rejects update if user does not own project', async () => {
    const service = createProjectsService(USER_ID, repo);

    vi.mocked(repo.getById).mockResolvedValueOnce({
      id: 'proj-1',
      userId: 'other-user',
    } as Project);

    const result = await service.updateProject('proj-1', {
      name: 'New Name',
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe(
        'You are not authorized to update this project'
      );
    }
  });

  /* ---------------------------------- */
  /* deleteProject                      */
  /* ---------------------------------- */

  it('rejects delete if user does not own project', async () => {
    const service = createProjectsService(USER_ID, repo);

    vi.mocked(repo.getById).mockResolvedValueOnce({
      id: 'proj-1',
      userId: 'someone-else',
    } as Project);

    const result = await service.deleteProject('proj-1');

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe(
        'You are not authorized to delete this project'
      );
    }
  });

  /* ---------------------------------- */
  /* getProject                         */
  /* ---------------------------------- */

  it('rejects getProject when project belongs to another user', async () => {
    const service = createProjectsService(USER_ID, repo);

    vi.mocked(repo.getById).mockResolvedValueOnce({
      id: 'proj-1',
      userId: 'other-user',
    } as Project);

    const result = await service.getProject('proj-1');

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe(
        'You are not authorized to view this project'
      );
    }
  });
});

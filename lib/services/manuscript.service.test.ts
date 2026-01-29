import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { createManuscriptService } from './manuscript.service';
import { ManuscriptRepository } from '../repositories/manuscript.repo';
import { ChapterRepository } from '../repositories/chapter.repo';
import { SceneRepository } from '../repositories/scene.repo';
import { ImageRepository } from '../repositories/image.repo';
import { ProjectsRepository } from '../repositories/projects.repo';
import { UserRepository } from '../repositories/user.repo';

describe("ManuscriptService", () => {
  // mock repositories
  let mockManuscriptRepo: ManuscriptRepository;
  let mockChapterRepo: ChapterRepository;
  let mockSceneRepo: SceneRepository;
  let mockImageRepo: ImageRepository;
  let mockProjectsRepo: ProjectsRepository;
  let mockUserRepo: UserRepository;
  let manuscriptService: ReturnType<typeof createManuscriptService>

  beforeEach(() => {
    mockManuscriptRepo = {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      getAllManuscriptsWithChapters: vi.fn(),
      reorder: vi.fn(),
    }
    mockChapterRepo = {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      reorder: vi.fn(),
      addContent: vi.fn(),
      updateContent: vi.fn(),
      reorderContent: vi.fn(),
      deleteContent: vi.fn(),
    }
    mockSceneRepo = {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    }
    mockImageRepo = {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    }
    mockProjectsRepo = {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      getAllByUser: vi.fn(),
      getByID: vi.fn(),
    }

    mockUserRepo = {
      create: vi.fn(),
      update: vi.fn(),
      getById: vi.fn(),
      delete: vi.fn(),
    }


    manuscriptService = createManuscriptService(
      mockManuscriptRepo,
      mockChapterRepo,
      mockSceneRepo,
      mockImageRepo,
      mockProjectsRepo,
      mockUserRepo
    )
  })
  afterEach(() => {
    vi.clearAllMocks();
  });
})

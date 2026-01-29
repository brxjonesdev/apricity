import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { createManuscriptService } from './manuscript.service';
import { ManuscriptRepository } from '../repositories/manuscript.repo';
import { ChapterRepository } from '../repositories/chapter.repo';
import { SceneRepository } from '../repositories/scene.repo';
import { ImageRepository } from '../repositories/image.repo';
import { ProjectsRepository } from '../repositories/projects.repo';
import { SupabaseClient } from '@supabase/supabase-js';

describe("ManuscriptService", () => {
  // mock repositories
  let mockManuscriptRepo: ManuscriptRepository;
  let mockChapterRepo: ChapterRepository;
  let mockSceneRepo: SceneRepository;
  let mockImageRepo: ImageRepository;
  let mockProjectsRepo: ProjectsRepository;
  let mockSupabaseClient: SupabaseClient;
  let manuscriptService: ReturnType<typeof createManuscriptService>

  beforeEach(() => {
    mockManuscriptRepo = {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      getById: vi.fn(),
      getAllManuscriptsWithChapters: vi.fn(),
    }
    mockChapterRepo = {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      getById: vi.fn(),
      addContent: vi.fn(),
      getContentById: vi.fn(),
      updateContent: vi.fn(),
      deleteContent: vi.fn(),
    }
    mockSceneRepo = {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      getById : vi.fn(),
    }
    mockImageRepo = {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      getById : vi.fn(),
    }
    mockProjectsRepo = {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      getAllByUser: vi.fn(),
      getByID: vi.fn(),
    }

    mockSupabaseClient = {
      rpc: vi.fn(),
      } as unknown as SupabaseClient;


    manuscriptService = createManuscriptService(
      mockSupabaseClient,
      mockManuscriptRepo,
      mockChapterRepo,
      mockSceneRepo,
      mockImageRepo,
      mockProjectsRepo,
    )
  })
  afterEach(() => {
    vi.clearAllMocks();
  });
})

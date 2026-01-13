// repo.ts
import {
  FileSystemItem,
  CreateFileSystemItemDTO,
  UpdateFileSystemItemDTO,
} from './types';
import { Result, ok, err } from '@/lib/utils';
import { db } from '@/lib/db/local/db';
import { createClient } from '../authentication/supabase/client';

export interface FileSystemRepository {
  findAll(
    userId: string,
    projectId: string,
  ): Promise<Result<FileSystemItem[], string>>;
  findById(
    id: string,
    userId: string,
  ): Promise<Result<FileSystemItem | null, string>>;
  findByParentId(
    parentId: string | undefined,
    userId: string,
  ): Promise<Result<FileSystemItem[], string>>;
  create(
    item: FileSystemItem,
    userId: string,
  ): Promise<Result<FileSystemItem, string>>;
  update(
    id: string,
    userId: string,
    updates: UpdateFileSystemItemDTO,
  ): Promise<Result<FileSystemItem, string>>;
  delete(id: string, userId: string): Promise<Result<null, string>>;
  batchDelete(
    ids: string[],
    userId: string,
  ) : Promise<Result<null, string>>;
  search(
    query: string,
    userId: string,
    projectId: string,
  ): Promise<Result<FileSystemItem[], string>>;
}

export function createInMemoryFileSystemRepository(): FileSystemRepository {
  const supabase = createClient();

  return {
    async findAll(userId: string): Promise<Result<FileSystemItem[], string>> {

    },

    async findById(
      id: string,
      userId: string,
    ): Promise<Result<FileSystemItem, string>> {

    },

    async findByParentId(
      parentId: string | undefined,
      userId: string,
    ): Promise<Result<FileSystemItem[], string>> {

    },

    async create(
      item: CreateFileSystemItemDTO & { userId: string },
    ): Promise<Result<FileSystemItem, string>> {
      // add to local db
      db.projects.add()
      // add to supabase db
      // return the created item

    },

    async update(
      id: string,
      userId: string,
      updates: UpdateFileSystemItemDTO,
    ): Promise<Result<FileSystemItem, string>> {

    },

    async delete(id: string, userId: string): Promise<Result<null, string>> {

    },
    async batchDelete(
      ids: string[],
      userId: string,
    ): Promise<Result<null, string>> {

    },

    async search(
      query: string,
      userId: string,
    ): Promise<Result<FileSystemItem[], string>> {

    },
  };
}

// repo.ts
import {
  FileSystemItem,
  CreateFileSystemItemDTO,
  UpdateFileSystemItemDTO,
} from './types';
import { Result, ok, err } from '@/lib/utils';

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
  search(
    query: string,
    userId: string,
    projectId: string,
  ): Promise<Result<FileSystemItem[], string>>;
}

export function createInMemoryFileSystemRepository(): FileSystemRepository {
  const store: Map<string, FileSystemItem> = new Map();

  return {
    async findAll(userId: string): Promise<Result<FileSystemItem[], string>> {
      try {
        const items = Array.from(store.values()).filter(
          (item) => item.userId === userId,
        );
        return ok(items);
      } catch (error) {
        return err(`Failed to fetch items: ${error}`);
      }
    },

    async findById(
      id: string,
      userId: string,
    ): Promise<Result<FileSystemItem, string>> {
      try {
        const item = store.get(id);
        if (!item) {
          return err(`Item with id ${id} not found`);
        }
        if (item.userId !== userId) {
          return err('Unauthorized access');
        }
        return ok(item);
      } catch (error) {
        return err(`Failed to fetch item: ${error}`);
      }
    },

    async findByParentId(
      parentId: string | undefined,
      userId: string,
    ): Promise<Result<FileSystemItem[], string>> {
      try {
        const items = Array.from(store.values()).filter(
          (item) => item.userId === userId && item.parentId === parentId,
        );
        return ok(items);
      } catch (error) {
        return err(`Failed to fetch folder contents: ${error}`);
      }
    },

    async create(
      item: CreateFileSystemItemDTO & { userId: string },
    ): Promise<Result<FileSystemItem, string>> {
      try {
        const newItem: FileSystemItem = {
          id: crypto.randomUUID(),
          ...item,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        store.set(newItem.id, newItem);
        return ok(newItem);
      } catch (error) {
        return err(`Failed to create item: ${error}`);
      }
    },

    async update(
      id: string,
      userId: string,
      updates: UpdateFileSystemItemDTO,
    ): Promise<Result<FileSystemItem, string>> {
      try {
        const item = store.get(id);
        if (!item) {
          return err(`Item with id ${id} not found`);
        }
        if (item.userId !== userId) {
          return err('Unauthorized access');
        }
        const updatedItem: FileSystemItem = {
          ...item,
          ...updates,
          updatedAt: new Date(),
        };
        store.set(id, updatedItem);
        return ok(updatedItem);
      } catch (error) {
        return err(`Failed to update item: ${error}`);
      }
    },

    async delete(id: string, userId: string): Promise<Result<null, string>> {
      try {
        const item = store.get(id);
        if (!item) {
          return err(`Item with id ${id} not found`);
        }
        if (item.userId !== userId) {
          return err('Unauthorized access');
        }
        store.delete(id);
        return ok(null);
      } catch (error) {
        return err(`Failed to delete item: ${error}`);
      }
    },

    async search(
      query: string,
      userId: string,
    ): Promise<Result<FileSystemItem[], string>> {
      try {
        const lowerQuery = query.toLowerCase();
        const items = Array.from(store.values()).filter(
          (item) =>
            item.userId === userId &&
            item.name.toLowerCase().includes(lowerQuery),
        );
        return ok(items);
      } catch (error) {
        return err(`Failed to search items: ${error}`);
      }
    },
  };
}

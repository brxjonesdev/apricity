import { FileSystemRepository } from './file-system.repo';
import {
  FileSystemItem,
  CreateFileSystemItemDTO,
  UpdateFileSystemItemDTO,
} from './types';
import { Result, ok, err } from '@/lib/utils';
export interface FileSystemService {
  getAllItems(): Promise<Result<FileSystemItem[], string>>;
  getItem(id: string): Promise<Result<FileSystemItem, string>>;
  getFolderContents(
    folderId: string | undefined,
  ): Promise<Result<FileSystemItem[], string>>;

  createItem(
    input: CreateFileSystemItemDTO,
  ): Promise<Result<FileSystemItem, string>>;
  updateItem(
    id: string,
    updates: UpdateFileSystemItemDTO,
  ): Promise<Result<FileSystemItem, string>>;
  deleteItem(id: string): Promise<Result<null, string>>;

  moveItem(
    id: string,
    newParentId: string | undefined,
  ): Promise<Result<FileSystemItem, string>>;
  searchItems(query: string): Promise<Result<FileSystemItem[], string>>;
  buildFolderTree(items: FileSystemItem[]): unknown;
}

export function createFileSystemService(
  userId: string,
  repo: FileSystemRepository,
): FileSystemService {
  return {
    async getAllItems(): Promise<Result<FileSystemItem[], string>> {
      return err('not impled');
    },
    async getItem(id: string): Promise<Result<FileSystemItem, string>> {
      return err('not impled');
    },
    async getFolderContents(
      folderId: string,
    ): Promise<Result<FileSystemItem[], string>> {
      return err('not impled');
    },

    async createItem(
      input: CreateFileSystemItemDTO,
    ): Promise<Result<FileSystemItem, string>> {
      return err('not impled');
    },
    async updateItem(
      id: string,
      updates: UpdateFileSystemItemDTO,
    ): Promise<Result<FileSystemItem, string>> {
      return err('not impled');
    },
    async deleteItem(id: string): Promise<Result<null, string>> {
      return err('not impled');
    },
    async moveItem(
      id: string,
      newParentId: string | undefined,
    ): Promise<Result<FileSystemItem, string>> {
      return err('not impled');
    },
    async searchItems(
      query: string,
    ): Promise<Result<FileSystemItem[], string>> {
      return err('not impled');
    },
    async buildFolderTree(items: FileSystemItem[]): Promise<unknown> {
      return err('not impled');
    },
  };
}

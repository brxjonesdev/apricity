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
  findAll(userId: string): Promise<Result<FileSystemItem[], string>>;
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

export function createFileSystemRepository(): FileSystemRepository {
  const supabase = createClient();

  return {
    async findAll(userId: string): Promise<Result<FileSystemItem[], string>> {
      const { data, error } = await supabase
        .from("file_system_items")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        return err(error.message);
      }
      const items: FileSystemItem[] = data.map((item) => ({
        id: item.id,
        userId: item.user_id,
        projectId: item.project_id,
        name: item.name,
        type: item.type,
        parentId: item.parent_id,
        content: item.content,
        size: item.size,
        order: item.order,
        isPinned: item.is_pinned,
        tags: item.tags,
        createdAt: new Date(item.created_at),
        updatedAt: new Date(item.updated_at),
      }));
      return ok(items);

    },

    async findById(
      id: string,
      userId: string,
    ): Promise<Result<FileSystemItem, string>> {
      const { data, error } = await supabase
        .from("file_system_items")
        .select("*")
        .eq("id", id)
        .eq("user_id", userId)
        .single();

      if (error) {
        return err(error.message);
      }
      const item: FileSystemItem = {
        id: data.id,
        userId: data.user_id,
        projectId: data.project_id,
        name: data.name,
        type: data.type,
        parentId: data.parent_id,
        content: data.content,
        size: data.size,
        order: data.order,
        isPinned: data.is_pinned,
        tags: data.tags,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
      };

      return ok(item);

    },

    async findByParentId(
      parentId: string | undefined,
      userId: string,
    ): Promise<Result<FileSystemItem[], string>> {
      const { data, error } = await supabase
        .from("file_system_items")
        .select("*")
        .eq("parent_id", parentId)
        .eq("user_id", userId);

      if (error) {
        return err(error.message);
      }
      const items: FileSystemItem[] = data.map((item) => ({
        id: item.id,
        userId: item.user_id,
        projectId: item.project_id,
        name: item.name,
        type: item.type,
        parentId: item.parent_id,
        content: item.content,
        size: item.size,
        order: item.order,
        isPinned: item.is_pinned,
        tags: item.tags,
        createdAt: new Date(item.created_at),
        updatedAt: new Date(item.updated_at),
      }));

      return ok(items);

    },

    async create(
      item: CreateFileSystemItemDTO & { userId: string },
    ): Promise<Result<FileSystemItem, string>> {
      const { data, error } = await supabase
        .from("file_system_items")
        .insert({
          user_id: item.userId,
          project_id: item.projectId,
          name: item.name,
          type: item.type,
          parent_id: item.parentId,
          content: item.content,
          size: 0,
          order: 0,
          is_pinned: item.isPinned,
          tags: item.tags,
        })
        .select()
        .single();

      if (error) {
        return err(error.message);
      }

      const created: FileSystemItem = {
             id: data.id,
             userId: data.user_id,
             projectId: data.project_id,
             name: data.name,
             type: data.type,
             parentId: data.parent_id,
             content: data.content,
             size: data.size,
             order: data.order,
             isPinned: data.is_pinned,
             tags: data.tags,
             createdAt: new Date(data.created_at),
             updatedAt: new Date(data.updated_at),
           };
      return ok(created);
    },

    async update(
      id: string,
      userId: string,
      updates: UpdateFileSystemItemDTO,
    ): Promise<Result<FileSystemItem, string>> {
      const { data, error } = await supabase
        .from("file_system_items")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("user_id", userId)
        .select()
        .single();

      if (error) {
        return err(error.message);
      }

      // Map DB row to FileSystemItem
      const updated: FileSystemItem = {
        id: data.id,
        userId: data.user_id,
        projectId: data.project_id,
        name: data.name,
        type: data.type,
        parentId: data.parent_id,
        content: data.content,
        size: data.size,
        order: data.order,
        isPinned: data.is_pinned,
        tags: data.tags,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
      };

      return ok(updated);
    },


    async delete(id: string, userId: string): Promise<Result<null, string>> {
      const { error } = await supabase
        .from("file_system_items")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);

      if (error) {
        return err(error.message);
      }
      return ok(null);

    },
    async batchDelete(
      ids: string[],
      userId: string,
    ): Promise<Result<null, string>> {
      const { error } = await supabase
        .from("file_system_items")
        .delete()
        .in("id", ids)
        .eq("user_id", userId);

      if (error) {
        return err(error.message);
      }
      return ok(null);

    },

    async search(
      query: string,
      userId: string,
    ): Promise<Result<FileSystemItem[], string>> {
      const { data, error } = await supabase
        .from("file_system_items")
        .select("*")
        .ilike("name", `%${query}%`)
        .like("content", `%${query}%`)
        .eq("user_id", userId);

      if (error) {
        return err(error.message);
      }
      const items: FileSystemItem[] = data.map((item) => ({
        id: item.id,
        userId: item.user_id,
        projectId: item.project_id,
        name: item.name,
        type: item.type,
        parentId: item.parent_id,
        content: item.content,
        size: item.size,
        order: item.order,
        isPinned: item.is_pinned,
        tags: item.tags,
        createdAt: new Date(item.created_at),
        updatedAt: new Date(item.updated_at),
      }));

      return ok(items);

    },
  };
}

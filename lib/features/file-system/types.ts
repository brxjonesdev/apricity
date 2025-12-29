export interface FileSystemItem {
  id: string;
  userId: string;
  name: string;
  type: 'file' | 'folder';
  parentId?: string; // undefined for root items
  content?: string; // only for files
  size?: number; // in bytes, only for files
  createdAt: Date;
  updatedAt: Date;
}

export type CreateFileSystemItemDTO = Omit<
  FileSystemItem,
  'id' | 'createdAt' | 'updatedAt' | 'size'
>;

export type UpdateFileSystemItemDTO = Partial<
  Omit<FileSystemItem, 'id' | 'userId' | 'createdAt' | 'type'>
>;

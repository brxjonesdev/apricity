export interface FileSystemItem {
  id: string;
  userId: string;
  projectId: string;
  name: string;
  type: 'file' | 'folder';
  parentId?: string; // undefined for root items
  content?: string; // only for files
  size?: number; // in bytes, only for files
  order: number; // for ordering within its parent folder and root
  isPinned?: boolean; // user can pin important items
  tags?: string[]; // user-defined tags for categorization, seperate from tags in the markdown content
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

export interface TreeNode extends FileSystemItem {
  children: TreeNode[];
}

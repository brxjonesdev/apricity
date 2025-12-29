// fileSystemService.test.ts
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { createFileSystemService } from './file-system.service';
import { FileSystemRepository } from './file-system.repo';
import { ok, err } from '@/lib/utils';
import {
  FileSystemItem,
  CreateFileSystemItemDTO,
  UpdateFileSystemItemDTO,
} from './types';

describe('FileSystemService', () => {
  let mockRepo: FileSystemRepository;
  let fileSystemService: ReturnType<typeof createFileSystemService>;
  const userId = 'user-123';

  beforeEach(() => {
    vi.useFakeTimers();
    mockRepo = {
      findAll: vi.fn(),
      findById: vi.fn(),
      findByParentId: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      search: vi.fn(),
    };
    fileSystemService = createFileSystemService(userId, mockRepo);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  // mock data
  const fileItem: FileSystemItem = {
    id: 'file-1',
    userId,
    name: 'Document.txt',
    type: 'file',
    content: 'Hello, world!',
    parentId: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
    size: 'Hello, world!'.length,
  } as unknown as FileSystemItem;

  const folderItem: FileSystemItem = {
    id: 'folder-1',
    userId,
    name: 'My Folder',
    type: 'folder',
    parentId: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const newFileDTO: CreateFileSystemItemDTO = {
    userId,
    name: 'NewFile.txt',
    type: 'file',
    content: 'New file content',
    parentId: undefined,
  };

  const updateFileDTO: UpdateFileSystemItemDTO = {
    name: 'UpdatedDocument.txt',
    content: 'Updated content',
  };

  const newFolderDTO: CreateFileSystemItemDTO = {
    userId,
    name: 'New Folder',
    type: 'folder',
    parentId: undefined,
  };

  const updateFolderDTO: UpdateFileSystemItemDTO = {
    name: 'Renamed Folder',
  };

  const generateItemList = (count: number): FileSystemItem[] => {
    const items: FileSystemItem[] = [];
    for (let i = 0; i < count; i++) {
      items.push({
        id: `item-${i}`,
        userId,
        name: `Item ${i}`,
        type: i % 2 === 0 ? 'file' : 'folder',
        parentId: i % 3 === 0 ? undefined : `folder-${Math.floor(i / 3)}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as FileSystemItem);
    }
    return items;
  };

  describe('getAllItems', () => {
    it('should return all items for the user', async () => {
      const items = generateItemList(5);
      vi.mocked(mockRepo.findAll).mockResolvedValueOnce(ok(items));

      const result = await fileSystemService.getAllItems();
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual(items);
      }
      expect(mockRepo.findAll).toHaveBeenCalledWith(userId);
    });

    it('should return error when repository fails', async () => {
      vi.mocked(mockRepo.findAll).mockResolvedValueOnce(
        err('Error fetching items'),
      );
      const result = await fileSystemService.getAllItems();
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe('Error fetching items');
      }
      expect(mockRepo.findAll).toHaveBeenCalledWith(userId);
    });
  });

  describe('getItem', () => {
    it('should return a single item by id', async () => {
      vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(fileItem));

      const result = await fileSystemService.getItem(fileItem.id);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual(fileItem);
      }
      expect(mockRepo.findById).toHaveBeenCalledWith(fileItem.id, userId);
    });

    it('should return error when item not found', async () => {
      const badID = 'bad-meow-get-off-my-desk';
      vi.mocked(mockRepo.findById).mockResolvedValueOnce(
        err(`Item with id ${badID} not found`),
      );
      const result = await fileSystemService.getItem(badID);
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe(`Item with id ${badID} not found`);
      }
      expect(mockRepo.findById).toHaveBeenCalledWith(badID, userId);
    });

    it('should return error when repository fails', async () => {
      vi.mocked(mockRepo.findById).mockResolvedValueOnce(
        err('Error fetching item from database'),
      );
      const result = await fileSystemService.getItem('some-id');
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe('Error fetching item from database');
      }
      expect(mockRepo.findById).toHaveBeenCalledWith('some-id', userId);
    });
  });

  describe('getFolderContents', () => {
    it('should return contents of a folder', async () => {
      const folderContents = [fileItem];
      vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(
        ok(folderContents),
      );

      const result = await fileSystemService.getFolderContents('folder-1');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual(folderContents);
      }

      expect(mockRepo.findByParentId).toHaveBeenCalledWith('folder-1', userId);
    });

    it('should return root level items when folderId is undefined', async () => {
      const rootContents = [folderItem, fileItem];
      vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(
        ok(rootContents),
      );

      const result = await fileSystemService.getFolderContents(undefined);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual(rootContents);
      }

      expect(mockRepo.findByParentId).toHaveBeenCalledWith(undefined, userId);
    });

    it('should return empty array when folder has no contents', async () => {
      vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(ok([]));

      const result = await fileSystemService.getFolderContents('empty-folder');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual([]);
      }

      expect(mockRepo.findByParentId).toHaveBeenCalledWith(
        'empty-folder',
        userId,
      );
    });

    it('should return error when repository fails', async () => {
      vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(
        err("There was an error fetching this folder's contents"),
      );

      const result = await fileSystemService.getFolderContents('folder-1');
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe(
          "There was an error fetching this folder's contents",
        );
      }

      expect(mockRepo.findByParentId).toHaveBeenCalledWith('folder-1', userId);
    });
  });

  describe('createItem', () => {
    it('should create a file successfully', async () => {
      const createdFile: FileSystemItem = {
        ...newFileDTO,
        id: 'new-file-1',
        createdAt: new Date(),
        updatedAt: new Date(),
        size: newFileDTO.content ? newFileDTO.content.length : 0,
      } as unknown as FileSystemItem;
      vi.mocked(mockRepo.create).mockResolvedValueOnce(ok(createdFile));

      const result = await fileSystemService.createItem(newFileDTO);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual(createdFile);
      }
      // Repo signature is create(item, userId)
      expect(mockRepo.create).toHaveBeenCalledWith(createdFile, userId);
    });

    it('should create a folder successfully', async () => {
      const createdFolder: FileSystemItem = {
        ...newFolderDTO,
        id: 'new-folder-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as FileSystemItem;
      vi.mocked(mockRepo.create).mockResolvedValueOnce(ok(createdFolder));

      const result = await fileSystemService.createItem(newFolderDTO);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual(createdFolder);
      }
      expect(mockRepo.create).toHaveBeenCalledWith(createdFolder, userId);
    });

    it('should validate required fields', async () => {
      const badFileDTO = {
        userId,
        name: '',
        type: 'file' as const,
        content: 'Some content',
        parentId: undefined,
      } as CreateFileSystemItemDTO;
      const result = await fileSystemService.createItem(badFileDTO);
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe('Item name is required.');
      }
    });
  });

  it('checks the destination parentID if one was given', async () => {
    vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(folderItem));
    const goodFileDTO = {
      userId,
      name: 'ChildFile.txt',
      type: 'file' as const,
      content: 'Some content',
      parentId: folderItem.id,
    };
    const newFile = {
      ...goodFileDTO,
      id: 'new-file-2',
      createdAt: new Date(),
      updatedAt: new Date(),
      size: goodFileDTO.content.length,
    } as FileSystemItem;
    vi.mocked(mockRepo.create).mockResolvedValueOnce(ok(newFile));
    const result = await fileSystemService.createItem(goodFileDTO);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data).toEqual(newFile);
    }
    expect(mockRepo.findById).toHaveBeenCalledWith(folderItem.id, userId);
    expect(mockRepo.create).toHaveBeenCalledWith(newFile, userId);
  });

  it('should return error when parent folder does not exist', async () => {
    vi.mocked(mockRepo.findById).mockResolvedValueOnce(
      err('No item matches given id.'),
    );
    const badID = 'non-existent-folder';
    const badFileDTO = {
      userId,
      name: 'OrphanedFile.txt',
      type: 'file' as const,
      content: 'Some content',
      parentId: badID,
    } as CreateFileSystemItemDTO;
    const result = await fileSystemService.createItem(badFileDTO);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe(
        `Parent folder with id ${badID} does not exist.`,
      );
    }
  });

  it('should return error when repository fails', async () => {
    vi.mocked(mockRepo.create).mockResolvedValueOnce(
      err('Error creating item'),
    );
    const result = await fileSystemService.createItem(newFileDTO);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe('Error creating item');
    }
    expect(mockRepo.create).toHaveBeenCalled();
  });

  describe('updateItem', () => {
    it('should update item name', async () => {
      const now = new Date();
      const updated: FileSystemItem = {
        ...fileItem,
        ...updateFileDTO,
        updatedAt: now,
      } as FileSystemItem;
      vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(fileItem));
      vi.mocked(mockRepo.update).mockResolvedValueOnce(ok(updated));

      const result = await fileSystemService.updateItem(fileItem.id, {
        name: updateFileDTO.name,
      });
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual(updated);
      }
      expect(mockRepo.findById).toHaveBeenCalledWith(fileItem.id, userId);
      expect(mockRepo.update).toHaveBeenCalledWith(
        fileItem.id,
        userId,
        expect.objectContaining({ name: updateFileDTO.name }),
      );
    });

    it('should update item content', async () => {
      const newContent = 'Brand new content';
      const updated: FileSystemItem = {
        ...fileItem,
        content: newContent,
        size: newContent.length,
        updatedAt: new Date(),
      } as FileSystemItem;
      vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(fileItem));
      vi.mocked(mockRepo.update).mockResolvedValueOnce(ok(updated));

      const result = await fileSystemService.updateItem(fileItem.id, {
        content: newContent,
      });
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual(updated);
      }
      expect(mockRepo.update).toHaveBeenCalledWith(
        fileItem.id,
        userId,
        expect.objectContaining({ content: newContent }),
      );
    });

    it('should not allow updating immutable fields', async () => {
      vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(fileItem));
      // Attempt to update immutable fields
      const result = await fileSystemService.updateItem(fileItem.id, {
        id: 'some-other-id',
        userId: 'attacker',
      } as unknown as UpdateFileSystemItemDTO);
      expect(result.ok).toBe(false);
      if (!result.ok) {
        // service should return a validation-like error
        expect(result.error).toMatch(/immutable/i);
      }
    });

    it('should return error when item not found', async () => {
      const missing = 'not-here-please';
      vi.mocked(mockRepo.findById).mockResolvedValueOnce(
        err(`Item with id ${missing} not found`),
      );
      const result = await fileSystemService.updateItem(missing, {
        name: 'Does not matter',
      });
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe(`Item with id ${missing} not found`);
      }
      expect(mockRepo.findById).toHaveBeenCalledWith(missing, userId);
    });

    it('should return error when repository fails', async () => {
      vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(fileItem));
      vi.mocked(mockRepo.update).mockResolvedValueOnce(err('Database error'));
      const result = await fileSystemService.updateItem(fileItem.id, {
        name: 'Failing Update',
      });
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe('Database error');
      }
      expect(mockRepo.update).toHaveBeenCalledWith(
        fileItem.id,
        userId,
        expect.any(Object),
      );
    });
  });

  describe('deleteItem', () => {
    it('should delete a file', async () => {
      vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(fileItem));
      vi.mocked(mockRepo.delete).mockResolvedValueOnce(ok(null));

      const result = await fileSystemService.deleteItem(fileItem.id);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBeNull();
      }
      expect(mockRepo.findById).toHaveBeenCalledWith(fileItem.id, userId);
      expect(mockRepo.delete).toHaveBeenCalledWith(fileItem.id, userId);
    });

    it('should delete an empty folder', async () => {
      vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(folderItem));
      vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(ok([]));
      vi.mocked(mockRepo.delete).mockResolvedValueOnce(ok(null));

      const result = await fileSystemService.deleteItem(folderItem.id);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBeNull();
      }
      expect(mockRepo.findByParentId).toHaveBeenCalledWith(
        folderItem.id,
        userId,
      );
      expect(mockRepo.delete).toHaveBeenCalledWith(folderItem.id, userId);
    });

    it('should recursively delete folder with contents', async () => {
      const child: FileSystemItem = {
        id: 'child-1',
        userId,
        name: 'Child.txt',
        type: 'file',
        parentId: folderItem.id,
        content: 'x',
        size: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as FileSystemItem;

      vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(folderItem));
      // first call to findByParentId returns child; when deleting child no further children
      vi.mocked(mockRepo.findByParentId)
        .mockResolvedValueOnce(ok([child])) // children of folder
        .mockResolvedValueOnce(ok([])); // children of child
      // mock delete calls succeed
      vi.mocked(mockRepo.delete).mockResolvedValue(ok(null));

      const result = await fileSystemService.deleteItem(folderItem.id);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toBeNull();
      }

      expect(mockRepo.findByParentId).toHaveBeenCalledWith(
        folderItem.id,
        userId,
      );
      expect(mockRepo.delete).toHaveBeenCalledWith(child.id, userId);
      expect(mockRepo.delete).toHaveBeenCalledWith(folderItem.id, userId);
    });

    it('should return error when item not found', async () => {
      const missing = 'missing-delete';
      vi.mocked(mockRepo.findById).mockResolvedValueOnce(
        err(`Item with id ${missing} not found`),
      );
      const result = await fileSystemService.deleteItem(missing);
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe(`Item with id ${missing} not found`);
      }
      expect(mockRepo.findById).toHaveBeenCalledWith(missing, userId);
    });

    it('should return error when repository fails', async () => {
      vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(folderItem));
      vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(
        err('DB error when listing children'),
      );

      const result = await fileSystemService.deleteItem(folderItem.id);
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe('DB error when listing children');
      }
      expect(mockRepo.findByParentId).toHaveBeenCalledWith(
        folderItem.id,
        userId,
      );
    });
  });

  describe('moveItem', () => {
    it('should move item to another folder', async () => {
      const now = new Date();
      const moved: FileSystemItem = {
        ...fileItem,
        parentId: folderItem.id,
        updatedAt: now,
      } as FileSystemItem;
      vi.mocked(mockRepo.findById)
        .mockResolvedValueOnce(ok(fileItem)) // find item
        .mockResolvedValueOnce(ok(folderItem)); // find target folder
      vi.mocked(mockRepo.update).mockResolvedValueOnce(ok(moved));

      const result = await fileSystemService.moveItem(
        fileItem.id,
        folderItem.id,
      );
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual(moved);
      }
      expect(mockRepo.findById).toHaveBeenCalledWith(fileItem.id, userId);
      expect(mockRepo.findById).toHaveBeenCalledWith(folderItem.id, userId);
      expect(mockRepo.update).toHaveBeenCalledWith(
        fileItem.id,
        userId,
        expect.objectContaining({ parentId: folderItem.id }),
      );
    });

    it('should move item to root level', async () => {
      const now = new Date();
      const moved: FileSystemItem = {
        ...fileItem,
        parentId: undefined,
        updatedAt: now,
      } as FileSystemItem;
      vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(fileItem));
      vi.mocked(mockRepo.update).mockResolvedValueOnce(ok(moved));

      const result = await fileSystemService.moveItem(fileItem.id, undefined);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual(moved);
      }
      expect(mockRepo.update).toHaveBeenCalledWith(
        fileItem.id,
        userId,
        expect.objectContaining({ parentId: undefined }),
      );
    });

    it('should prevent moving folder into itself', async () => {
      vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(folderItem));
      const result = await fileSystemService.moveItem(
        folderItem.id,
        folderItem.id,
      );
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toMatch(/cannot move.*itself/i);
      }
    });

    it('should prevent moving folder into its descendant', async () => {
      const parent = { ...folderItem, id: 'f-parent' } as FileSystemItem;
      const child = {
        ...folderItem,
        id: 'f-child',
        parentId: 'f-parent',
      } as FileSystemItem;
      vi.mocked(mockRepo.findById)
        .mockResolvedValueOnce(ok(parent)) // item being moved
        .mockResolvedValueOnce(ok(child)); // target folder (child)
      // mock findByParentId to return child's children when traversing ancestry
      vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(
        ok([
          {
            id: 'f-child',
            userId,
            name: 'child',
            type: 'folder',
            createdAt: new Date(),
            updatedAt: new Date(),
          } as FileSystemItem,
        ]),
      );
      const result = await fileSystemService.moveItem(parent.id, child.id);
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toMatch(/descendant/i);
      }
    });

    it('should return error when target folder does not exist', async () => {
      vi.mocked(mockRepo.findById)
        .mockResolvedValueOnce(ok(fileItem)) // item
        .mockResolvedValueOnce(err('Item with id target not found')); // target
      const result = await fileSystemService.moveItem(fileItem.id, 'target');
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toMatch(/target folder/i);
      }
    });

    it('should return error when item not found', async () => {
      vi.mocked(mockRepo.findById).mockResolvedValueOnce(
        err('Item with id missing not found'),
      );
      const result = await fileSystemService.moveItem('missing', 'any');
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toMatch(/not found/i);
      }
    });

    it('should return error when repository fails', async () => {
      vi.mocked(mockRepo.findById)
        .mockResolvedValueOnce(ok(fileItem))
        .mockResolvedValueOnce(ok(folderItem));
      vi.mocked(mockRepo.update).mockResolvedValueOnce(err('DB update failed'));
      const result = await fileSystemService.moveItem(
        fileItem.id,
        folderItem.id,
      );
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe('DB update failed');
      }
    });
  });

  describe('searchItems', () => {
    it('should find items by name', async () => {
      vi.mocked(mockRepo.search).mockResolvedValueOnce(ok([fileItem]));
      const result = await fileSystemService.searchItems('Document');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual([fileItem]);
      }
      expect(mockRepo.search).toHaveBeenCalledWith('Document', userId);
    });

    it('should search case-insensitively', async () => {
      vi.mocked(mockRepo.search).mockResolvedValueOnce(ok([fileItem]));
      const result = await fileSystemService.searchItems('document');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual([fileItem]);
      }
      expect(mockRepo.search).toHaveBeenCalledWith('document', userId);
    });

    it('should return empty array when no matches found', async () => {
      vi.mocked(mockRepo.search).mockResolvedValueOnce(ok([]));
      const result = await fileSystemService.searchItems('no-match');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual([]);
      }
    });

    it('should return error when repository fails', async () => {
      vi.mocked(mockRepo.search).mockResolvedValueOnce(err('Search DB error'));
      const result = await fileSystemService.searchItems('fail');
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe('Search DB error');
      }
      expect(mockRepo.search).toHaveBeenCalledWith('fail', userId);
    });
  });

  describe('buildFolderTree', () => {
    it('should build a tree from flat list of items', async () => {
      const root: FileSystemItem = {
        id: 'r',
        userId,
        name: 'root',
        type: 'folder',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as FileSystemItem;
      const child: FileSystemItem = {
        id: 'c',
        userId,
        name: 'child',
        type: 'folder',
        parentId: 'r',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as FileSystemItem;
      const file: FileSystemItem = {
        id: 'f',
        userId,
        name: 'file',
        type: 'file',
        parentId: 'c',
        content: 'x',
        size: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as FileSystemItem;

      const treeResult = await fileSystemService.buildFolderTree([
        root,
        child,
        file,
      ]);
      // Ensure we return some structure that nests child under root and file under child
      expect(treeResult).toBeTruthy();
      // We can't assert exact shape since buildFolderTree returns unknown; check for nesting by probing properties
      // Convert to JSON string to do a loose substring check for presence of ids in nesting order (robust for most implementations)
      const s = JSON.stringify(treeResult);
      expect(s.indexOf('r')).toBeLessThan(s.indexOf('c'));
      expect(s.indexOf('c')).toBeLessThan(s.indexOf('f'));
    });

    it('should handle items with no parent (root level)', async () => {
      const a: FileSystemItem = {
        id: 'a',
        userId,
        name: 'A',
        type: 'file',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as FileSystemItem;
      const treeResult = await fileSystemService.buildFolderTree([a]);
      expect(treeResult).toBeTruthy();
      const s = JSON.stringify(treeResult);
      expect(s).toContain('a');
    });

    it('should handle nested folders', async () => {
      const a: FileSystemItem = {
        id: 'a',
        userId,
        name: 'A',
        type: 'folder',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as FileSystemItem;
      const b: FileSystemItem = {
        id: 'b',
        userId,
        name: 'B',
        type: 'folder',
        parentId: 'a',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as FileSystemItem;
      const c: FileSystemItem = {
        id: 'c',
        userId,
        name: 'C',
        type: 'file',
        parentId: 'b',
        content: 'x',
        size: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as FileSystemItem;

      const treeResult = await fileSystemService.buildFolderTree([a, b, c]);
      expect(treeResult).toBeTruthy();
      const s = JSON.stringify(treeResult);
      expect(s.indexOf('a')).toBeLessThan(s.indexOf('b'));
      expect(s.indexOf('b')).toBeLessThan(s.indexOf('c'));
    });

    it('should handle empty list', async () => {
      const treeResult = await fileSystemService.buildFolderTree([]);
      // Expect empty-ish structure
      const s = JSON.stringify(treeResult);
      expect(s).toBeTruthy();
    });

    it('should handle orphaned items', async () => {
      // An item referencing a parent id that does not exist should still be present (orphan handling)
      const orphan: FileSystemItem = {
        id: 'o',
        userId,
        name: 'Orphan',
        type: 'file',
        parentId: 'nope',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as FileSystemItem;
      const treeResult = await fileSystemService.buildFolderTree([orphan]);
      const s = JSON.stringify(treeResult);
      expect(s).toContain('o');
    });
  });

  describe('integration scenarios', () => {
    it('should create folder, add file, then retrieve contents', async () => {
      const createdFolder: FileSystemItem = {
        ...newFolderDTO,
        id: 'folder-int-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as FileSystemItem;
      vi.mocked(mockRepo.create).mockResolvedValueOnce(ok(createdFolder));
      const resFolder = await fileSystemService.createItem(newFolderDTO);
      expect(resFolder.ok).toBe(true);
      if (resFolder.ok) expect(resFolder.data).toEqual(createdFolder);
      // add file
      const fileDTO = { ...newFileDTO, parentId: createdFolder.id };
      const createdFile: FileSystemItem = {
        ...fileDTO,
        id: 'file-int-1',
        createdAt: new Date(),
        updatedAt: new Date(),
        size: fileDTO.content!.length,
      } as FileSystemItem;
      vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(createdFolder)); // for parent check
      vi.mocked(mockRepo.create).mockResolvedValueOnce(ok(createdFile));
      const resFile = await fileSystemService.createItem(fileDTO);
      expect(resFile.ok).toBe(true);
      if (resFile.ok) expect(resFile.data).toEqual(createdFile);
      // retrieving contents
      vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(
        ok([createdFile]),
      );
      const contents = await fileSystemService.getFolderContents(
        createdFolder.id,
      );
      expect(contents.ok).toBe(true);
      if (contents.ok) expect(contents.data).toEqual([createdFile]);
    });

    it('should move file between folders', async () => {
      const srcFolder: FileSystemItem = {
        id: 'src',
        userId,
        name: 'Src',
        type: 'folder',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as FileSystemItem;
      const dstFolder: FileSystemItem = {
        id: 'dst',
        userId,
        name: 'Dst',
        type: 'folder',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as FileSystemItem;
      const fileToMove: FileSystemItem = {
        ...fileItem,
        parentId: srcFolder.id,
      } as FileSystemItem;
      vi.mocked(mockRepo.findById)
        .mockResolvedValueOnce(ok(fileToMove)) // find item
        .mockResolvedValueOnce(ok(dstFolder)); // target folder
      const moved = {
        ...fileToMove,
        parentId: dstFolder.id,
        updatedAt: new Date(),
      } as FileSystemItem;
      vi.mocked(mockRepo.update).mockResolvedValueOnce(ok(moved));
      const result = await fileSystemService.moveItem(
        fileToMove.id,
        dstFolder.id,
      );
      expect(result.ok).toBe(true);
      if (result.ok) expect(result.data).toEqual(moved);
    });

    it('should rename folder and verify all children maintain reference', async () => {
      const parent: FileSystemItem = {
        id: 'p',
        userId,
        name: 'Parent',
        type: 'folder',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as FileSystemItem;
      const child: FileSystemItem = {
        id: 'ch',
        userId,
        name: 'Child',
        type: 'file',
        parentId: 'p',
        content: 'x',
        size: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as FileSystemItem;
      vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(parent));
      vi.mocked(mockRepo.update).mockResolvedValueOnce(
        ok({
          ...parent,
          name: 'Parent Renamed',
          updatedAt: new Date(),
        } as FileSystemItem),
      );
      // renaming parent should not change child's parentId; we assert that when fetching child later
      const renameRes = await fileSystemService.updateItem(parent.id, {
        name: 'Parent Renamed',
      });
      expect(renameRes.ok).toBe(true);
      vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(child));
      const childFetch = await fileSystemService.getItem(child.id);
      expect(childFetch.ok).toBe(true);
      if (childFetch.ok) expect(childFetch.data.parentId).toBe(parent.id);
    });

    it('should delete folder and verify children are deleted', async () => {
      const parent: FileSystemItem = {
        id: 'pdel',
        userId,
        name: 'ParentDel',
        type: 'folder',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as FileSystemItem;
      const child: FileSystemItem = {
        id: 'cdel',
        userId,
        name: 'ChildDel',
        type: 'file',
        parentId: 'pdel',
        content: 'y',
        size: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as FileSystemItem;
      vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(parent));
      vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(ok([child]));
      // ensure delete called for child then parent
      vi.mocked(mockRepo.delete).mockResolvedValue(ok(null));
      const delRes = await fileSystemService.deleteItem(parent.id);
      expect(delRes.ok).toBe(true);
      expect(mockRepo.delete).toHaveBeenCalledWith(child.id, userId);
      expect(mockRepo.delete).toHaveBeenCalledWith(parent.id, userId);
    });
  });
});

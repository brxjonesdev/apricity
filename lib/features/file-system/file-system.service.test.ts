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
  const projectId = 'project-456';

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
    fileSystemService = createFileSystemService(userId, projectId, mockRepo);
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
    projectId,
    name: 'My Folder',
    type: 'folder',
    parentId: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const newFileDTO: CreateFileSystemItemDTO = {
    userId,
    projectId,
    name: 'NewFile.txt',
    type: 'file',
    content: '',
    parentId: undefined,
  };

  const updateFileDTO: UpdateFileSystemItemDTO = {
    name: 'UpdatedDocument.txt',
    content: 'Updated content',
  };

  const newFolderDTO: CreateFileSystemItemDTO = {
    userId,
    projectId,
    name: 'New Folder',
    type: 'folder',
    parentId: undefined,
  };

  const updateFolderDTO: UpdateFileSystemItemDTO = {
    name: 'Renamed Folder',
  };

  const generateChildren = (
    parentId: string,
    count: number,
  ): FileSystemItem[] => {
    const items: FileSystemItem[] = [];
    for (let i = 0; i < count; i++) {
      items.push({
        id: `child-${i}`,
        userId,
        projectId,
        name: `Child Item ${i}`,
        type: i % 2 === 0 ? 'file' : 'folder',
        parentId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return items;
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

      const result = await fileSystemService.getAllItems(projectId);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual(items);
      }
      expect(mockRepo.findAll).toHaveBeenCalledWith(userId, projectId);
    });

    it('should return error when repository fails', async () => {
      vi.mocked(mockRepo.findAll).mockResolvedValueOnce(
        err('Error fetching items'),
      );
      const result = await fileSystemService.getAllItems(projectId);
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe('Error fetching items');
      }
      expect(mockRepo.findAll).toHaveBeenCalledWith(userId, projectId);
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
        id: '', // id will be set by repo
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      vi.mocked(mockRepo.create).mockResolvedValueOnce(ok(createdFile));

      const result = await fileSystemService.createItem(newFileDTO);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual(createdFile);
      }
      // Repo signature is create(item, userId)
      expect(mockRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          ...newFileDTO,
        }),
        userId,
      );
    });

    it('should create a folder successfully', async () => {
      const createdFolder: FileSystemItem = {
        ...newFolderDTO,
        id: '',
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

    it('checks the destination parentID if one was given', async () => {
      const now = new Date();
      vi.setSystemTime(now);
      const parentFolder: FileSystemItem = {
        id: 'parent-folder',
        userId,
        projectId,
        name: 'Parent Folder',
        type: 'folder',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const newFileDTO: CreateFileSystemItemDTO = {
        userId,
        name: 'ChildFile.txt',
        projectId,
        type: 'file' as const,
        content: '',
        parentId: parentFolder.id,
      };
      const createdFile: FileSystemItem = {
        ...newFileDTO,
        id: '',
        createdAt: now,
        updatedAt: now,
      };
      vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(parentFolder));
      vi.mocked(mockRepo.create).mockResolvedValueOnce(ok(createdFile));

      const result = await fileSystemService.createItem(newFileDTO);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual(createdFile);
      }
      expect(mockRepo.findById).toHaveBeenCalledWith(parentFolder.id, userId);
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
          `Parent folder does not exist or unauthorized`,
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
  });

  describe('updateItem', () => {
    describe('validates the updates given', () => {
      it('should prevent empty name', async () => {
        const badUpdateDTO: UpdateFileSystemItemDTO = {
          name: '        ',
        };
        const result = await fileSystemService.updateItem(
          fileItem.id,
          badUpdateDTO,
        );
        expect(result.ok).toBe(false);
        if (!result.ok) {
          expect(result.error).toBe('Item name cannot be empty');
        }
      });
      it('should allow valid updates', async () => {
        const now = new Date();
        vi.setSystemTime(now);
        const updatedItem: FileSystemItem = {
          ...fileItem,
          ...updateFileDTO,
          updatedAt: now,
        };
        vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(fileItem));
        vi.mocked(mockRepo.update).mockResolvedValueOnce(ok(updatedItem));
        const result = await fileSystemService.updateItem(
          fileItem.id,
          updateFileDTO,
        );
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data).toEqual(updatedItem);
        }
      });
      it('should trim whitespace from name', async () => {
        const updateDTO: UpdateFileSystemItemDTO = {
          name: '   TrimmedName.txt   ',
        };
        const now = new Date();
        vi.setSystemTime(now);
        const updatedItem: FileSystemItem = {
          ...fileItem,
          name: 'TrimmedName.txt',
          updatedAt: now,
        };
        vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(fileItem));
        vi.mocked(mockRepo.update).mockResolvedValueOnce(ok(updatedItem));
        const result = await fileSystemService.updateItem(
          fileItem.id,
          updateDTO,
        );
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data).toEqual(updatedItem);
          expect(result.data.name).toBe('TrimmedName.txt');
        }
      });
    });

    describe('checks to see if the target item exists', () => {
      it('should return error when item not found', async () => {
        const badID = 'non-existent-id';
        vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(null));
        const result = await fileSystemService.updateItem(badID, updateFileDTO);
        expect(result.ok).toBe(false);
        if (!result.ok) {
          expect(result.error).toBe(`Item with id ${badID} not found`);
        }
      });
      it('should return error when repository fails', async () => {
        vi.mocked(mockRepo.findById).mockResolvedValueOnce(
          err('DB error when finding item'),
        );
        const result = await fileSystemService.updateItem(
          fileItem.id,
          updateFileDTO,
        );
        expect(result.ok).toBe(false);
        if (!result.ok) {
          expect(result.error).toBe('DB error when finding item');
        }
      });
    });
    describe('handles name conflicts', () => {
      it('should add (n) when renamed file conflicts with existing sibling', async () => {
        const now = new Date();
        vi.setSystemTime(now);
        const siblingItem: FileSystemItem = {
          id: 'sibling-1',
          userId,
          projectId,
          name: 'ConflictingName.txt',
          type: 'file',
          parentId: fileItem.parentId,
          createdAt: now,
          updatedAt: now,
          content: '',
        };
        const siblingItem2: FileSystemItem = {
          ...siblingItem,
          id: 'sibling-2',
        };
        const conflictUpdateDTO: UpdateFileSystemItemDTO = {
          name: 'ConflictingName.txt',
        };
        const updatedItem: FileSystemItem = {
          ...fileItem,
          name: 'ConflictingName (1).txt',
        };

        vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(siblingItem2));
        vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(
          ok([siblingItem, siblingItem2]),
        );
        vi.mocked(mockRepo.update).mockResolvedValueOnce(ok(updatedItem));

        const result = await fileSystemService.updateItem(
          fileItem.id,
          conflictUpdateDTO,
        );
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data).toEqual(updatedItem);
          expect(result.data.name).toBe('ConflictingName (1).txt');
        }
      });
    });
    describe('updates item in repository', () => {
      it('should return error when repository fails during update', async () => {
        vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(fileItem));
        vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(ok([]));
        vi.mocked(mockRepo.update).mockResolvedValueOnce(
          err('DB error during update'),
        );

        const result = await fileSystemService.updateItem(
          fileItem.id,
          updateFileDTO,
        );
        expect(result.ok).toBe(false);
        if (!result.ok) {
          expect(result.error).toBe('DB error during update');
        }
      });
      it('should return the updated item', async () => {
        const now = new Date();
        vi.setSystemTime(now);
        const updatedItem: FileSystemItem = {
          ...fileItem,
          ...updateFileDTO,
          updatedAt: now,
        };
        vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(fileItem));
        vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(ok([]));
        vi.mocked(mockRepo.update).mockResolvedValueOnce(ok(updatedItem));
        const result = await fileSystemService.updateItem(
          fileItem.id,
          updateFileDTO,
        );
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data).toEqual(updatedItem);
        }
      });
    });
  });

  describe('deleteItem', () => {
    describe('validates input', () => {
      it('should return an error if given an invalid ID format', async () => {
        const badID = '   ';
        const result = await fileSystemService.deleteItem(badID);
        expect(result.ok).toBe(false);
        if (!result.ok) {
          expect(result.error).toBe('Invalid item ID provided.');
        }
      });
    });

    describe('checks if item exists', () => {
      it('should return error when item not found', async () => {
        const badID = 'non-existent-id';
        vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(null));
        const result = await fileSystemService.deleteItem(badID);
        expect(result.ok).toBe(false);
        if (!result.ok) {
          expect(result.error).toBe(`Item with id ${badID} not found`);
        }
      });
      it('should return error when repository fails during find', async () => {
        vi.mocked(mockRepo.findById).mockResolvedValueOnce(
          err('DB find error'),
        );
        const result = await fileSystemService.deleteItem('some-id');
        expect(result.ok).toBe(false);
        if (!result.ok) {
          expect(result.error).toBe('DB find error');
        }
      });
    });

    describe('deletes item from repository', () => {
      it('should delete a file successfully', async () => {
        vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(fileItem));
        vi.mocked(mockRepo.delete).mockResolvedValueOnce(ok(null));
        const result = await fileSystemService.deleteItem(fileItem.id);
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data).toBeNull();
        }
      });
      it('should delete an empty folder successfully', async () => {
        vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(folderItem));
        vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(ok([]));
        vi.mocked(mockRepo.delete).mockResolvedValueOnce(ok(null));
        const result = await fileSystemService.deleteItem(folderItem.id);
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data).toBeNull();
        }
      });
      it('should recursively delete folder with all contents');
      it('should return an error if any of the child deletions error');
      it('should return error when repository fails during delete', async () => {
        vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(fileItem));
        vi.mocked(mockRepo.delete).mockResolvedValueOnce(
          err('DB Delete Error'),
        );
        const result = await fileSystemService.deleteItem(fileItem.id);
        expect(result.ok).toBe(false);
        if (!result.ok) {
          expect(result.error).toBe('DB Delete Error');
        }
      });
    });
  });

  describe('moveItem', () => {
    describe('validates input', () => {
      it('should return error for invalid target parent ID', async () => {
        const badParentID = '';
        const badID = '';
        const result = await fileSystemService.moveItem(badID, badParentID);
        expect(result.ok).toBe(false);
      });
      it('should return an error if id === newParentId', async () => {
        const itemID = 'item-123';
        const parentID = itemID;
        const result = await fileSystemService.moveItem(itemID, parentID);
        expect(result.ok).toBe(false);
        if (!result.ok) {
          expect(result.error).toBe(
            'Cannot move item into itself. Please choose a different target location.',
          );
        }
      });
    });
    describe('checks if item exists', () => {
      it('should return error when item not found', async () => {
        const badID = 'non-existent-id';
      });
      it('should return error when repository fails during find');
      it('should return nothing if the parent id matches');
    });
    describe('checks if target parent folder exists', () => {
      it('should return error when target parent folder not found');
      it('should return error when repository fails during target parent find');
      it('should return an error if new parent is a file');
      it("should return an error if user doesn't own the target parent folder");
      it('should return an error if new parent ID is in another project');
    });

    describe('handles name conflicts', () => {
      it('should rename item if name conflict in target folder');
      it('should allow move is name is different only by case-insenstivity');
    });

    describe('prevents circular references', () => {
      it('should reject moving folder into itself');
      it('should reject moving folder into its direct child');
      it('should reject moving folder into its descendant');
      it('should allow moving file anywhere (files cannot contain children)');
      it('should allow moving folder to unrelated branch');
    });

    describe('moves item successfully', () => {
      it('should move file to new parent and preserve all properties');
      it('should move folder to new parent');
      it('should move item to root level (undefined parent)');
      it('should preserve isPinned status when moving');
      it('should preserve tags when moving');
      it('should update updatedAt timestamp');
      it('should handle moving item that is already at destination (no-op)');
    });

    describe('handles repository errors', () => {
      it('should return error when repository fails during update');
      it('should return error when checking destination children fails');
    });

    describe('edge cases', () => {
      it('should handle moving item with no tags');
      it('should handle moving item with no order');
      it('should handle moving unpinned item');
    });
  });

  describe('searchItems', () => {
    describe('validates query', async () => {
      it('should return error for empty query', async () => {
        const result = await fileSystemService.searchItems('   ');
        expect(result.ok).toBe(false);
        if (!result.ok) {
          expect(result.error).toBe('Search query cannot be empty.');
        }
      });
      it('should remove whitespace', async () => {
        const query = '   important document   ';
        const trimmedQuery = 'important document';
        vi.mocked(mockRepo.search).mockResolvedValueOnce(ok([]));
        await fileSystemService.searchItems(query);
        expect(mockRepo.search).toHaveBeenCalledWith(
          trimmedQuery,
          userId,
          projectId,
        );
      });
    });
    describe('performs search in repository', () => {
      it('should return matching items', async () => {
        const query = 'Document';
        const matchingItems = [fileItem];
        vi.mocked(mockRepo.search).mockResolvedValueOnce(ok(matchingItems));

        const result = await fileSystemService.searchItems(query);
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data).toEqual(matchingItems);
        }
        expect(mockRepo.search).toHaveBeenCalledWith(query, userId, projectId);
      });
      it('should return empty array when no matches found', async () => {
        const query = 'NonExistentFile';
        vi.mocked(mockRepo.search).mockResolvedValueOnce(ok([]));

        const result = await fileSystemService.searchItems(query);
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data).toEqual([]);
        }
        expect(mockRepo.search).toHaveBeenCalledWith(query, userId, projectId);
      });
      it('should return error when repository fails', async () => {
        const query = 'ErrorQuery';
        vi.mocked(mockRepo.search).mockResolvedValueOnce(
          err('DB search error'),
        );

        const result = await fileSystemService.searchItems(query);
        expect(result.ok).toBe(false);
        if (!result.ok) {
          expect(result.error).toBe('DB search error');
        }
        expect(mockRepo.search).toHaveBeenCalledWith(query, userId, projectId);
      });
    });
  });

  describe('buildFolderTree', () => {
    describe('basic tree construction', () => {
      it('builds a tree from a flat list of items');
      it('creates correct parent-child relationships');
      it('supports mixed file and folder nodes');
    });

    describe('root-level handling', () => {
      it('places items with no parent at root level');
      it('supports multiple root-level items');
      it('returns empty array when given empty list');
    });

    describe('nested structures', () => {
      it('handles deeply nested folders');
      it('places files correctly within nested folders');
      it('maintains correct depth ordering');
    });

    describe('orphaned items', () => {
      it('places items with missing parent at root level');
      it('does not throw when parent reference is invalid');
    });

    describe('mixed hierarchy scenarios', () => {
      it('handles mix of root files and root folders');
      it('handles root files alongside nested folder trees');
    });

    describe('node shape guarantees', () => {
      it('adds children array to all nodes');
      it('ensures files have empty children arrays');
      it('preserves original item properties on nodes');
    });

    describe('ordering behavior', () => {
      it('preserves input order for root-level items');
      it('preserves input order for sibling nodes');
    });

    describe('edge cases', () => {
      it('handles single-item input');
      it('handles list containing only files');
      it('handles list containing only folders');
    });
  });
});

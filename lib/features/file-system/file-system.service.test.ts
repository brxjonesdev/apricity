/* typescript-eslint-disable no-implicit-any */
/* typescript-eslint: disable no-implicit-any */
/* typescript-eslint: disable noImplicitAny */
/* typescript-eslint-disable @typescript-eslint/no-implicit-any */
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { createFileSystemService } from './file-system.service';
import { FileSystemRepository } from './file-system.repo';
import { ok, err } from '@/lib/utils';
import {
  FileSystemItem,
  CreateFileSystemItemDTO,
  UpdateFileSystemItemDTO,
  TreeNode,
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
      batchDelete: vi.fn(),
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
    projectId,
    order: 0,
    type: 'file',
    content: 'Hello, world!',
    parentId: undefined,
    isPinned: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    size: 'Hello, world!'.length,
  };

  const folderItem: FileSystemItem = {
    id: 'folder-1',
    userId,
    projectId,
    name: 'My Folder',
    type: 'folder',
    isPinned: false,
    order: 0,
    parentId: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const newFileDTO: CreateFileSystemItemDTO = {
    userId,
    projectId,
    name: 'NewFile.txt',
    isPinned: false,
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
    isPinned: false,
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
        isPinned: false,
        name: `Child Item ${i}`,
        type: i % 2 === 0 ? 'file' : 'folder',
        parentId,
        order: i,
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

      const result = await fileSystemService.getAllItems();
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
      const result = await fileSystemService.getAllItems();
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
        order: 0,
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
        order: 0,
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
        isPinned: false,
        parentId: undefined,
        name: 'Parent Folder',
        type: 'folder',
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const newFileDTO: CreateFileSystemItemDTO = {
        userId,
        name: 'ChildFile.txt',
        projectId,
        isPinned: false,
        type: 'file' as const,
        content: '',
        parentId: parentFolder.id,
      };
      const createdFile: FileSystemItem = {
        ...newFileDTO,
        id: '',
        order: 0,
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
          order: 1,
          name: 'ConflictingName.txt',
          type: 'file',
          isPinned: false,
          parentId: fileItem.parentId,
          createdAt: now,
          updatedAt: now,
          content: '',
        };
        const siblingItem2: FileSystemItem = {
          ...siblingItem,
          id: 'sibling-2',
          order: 0,
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
        vi.mocked(mockRepo.findById).mockResolvedValueOnce(err('DB find error'));
        const result = await fileSystemService.deleteItem('some-id');
        expect(result.ok).toBe(false);
        if (!result.ok) {
          expect(result.error).toBe('DB find error');
        }
      });
    });

    describe('deletes item from repository', () => {
      it('should delete a file successfully', async () => {
        // ensure findById always returns the file for all calls during traversal
        vi.mocked(mockRepo.findById).mockResolvedValue(ok(fileItem));
        vi.mocked(mockRepo.batchDelete).mockResolvedValueOnce(ok(null));

        const result = await fileSystemService.deleteItem(fileItem.id);
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data).toBeNull();
        }

        expect(vi.mocked(mockRepo.batchDelete)).toHaveBeenCalledWith([fileItem.id], userId);
      });

      it('should delete an empty folder successfully', async () => {
        // ensure findById always returns the folder for all calls during traversal
        vi.mocked(mockRepo.findById).mockResolvedValue(ok(folderItem));
        vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(ok([]));
        vi.mocked(mockRepo.batchDelete).mockResolvedValueOnce(ok(null));

        const result = await fileSystemService.deleteItem(folderItem.id);
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data).toBeNull();
        }

        expect(vi.mocked(mockRepo.batchDelete)).toHaveBeenCalledWith([folderItem.id], userId);
      });

      it('should recursively delete folder with all contents', async () => {
        const children = generateChildren(folderItem.id, 3);

        // Provide findByParentId impl: return children for the root, empty for nested parents
        vi.mocked(mockRepo.findByParentId).mockImplementation(async (parentId?: string) => {
          if (parentId === folderItem.id) return ok(children);
          return ok([]);
        });
        expect(children.length).toBe(3);

        // traversal will call findById for each id; provide implementation that returns
        // the folder for the root id and the correct child for each child id.
        vi.mocked(mockRepo.findById).mockImplementation(async (id: string) => {
          if (id === folderItem.id) return ok(folderItem);
          const c = children.find((ch) => ch.id === id);
          return c ? ok(c) : err(`Item with id ${id} not found`);
        });

        vi.mocked(mockRepo.batchDelete).mockResolvedValueOnce(ok(null));

        const result = await fileSystemService.deleteItem(folderItem.id);
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data).toBeNull();
        }

        const expectedOrder = [...children.map((c) => c.id), folderItem.id];
        expect(vi.mocked(mockRepo.batchDelete)).toHaveBeenCalledWith(expectedOrder, userId);
      });


      it('should stop deletion and return error if nested child deletion fails', async () => {
        const children = generateChildren(folderItem.id, 2);

        vi.mocked(mockRepo.findById).mockImplementation(async (id: string) => {
          if (id === folderItem.id) return ok(folderItem);
          const c = children.find((ch) => ch.id === id);
          return c ? ok(c) : err(`Item with id ${id} not found`);
        });

        vi.mocked(mockRepo.findByParentId).mockImplementation(async (parentId?: string) => {
          if (parentId === folderItem.id) return ok(children);
          return ok([]);
        });

        // Simulate batch delete failing
        vi.mocked(mockRepo.batchDelete).mockResolvedValueOnce(err('DB Delete Error on child'));

        const result = await fileSystemService.deleteItem(folderItem.id);
        expect(result.ok).toBe(false);
        if (!result.ok) {
          expect(result.error).toBe(
            'One or more items could not be deleted due to an database error.',
          );
        }
      });

      it('should return error when repository fails during delete', async () => {
        // ensure findById always returns the file for traversal
        vi.mocked(mockRepo.findById).mockResolvedValue(ok(fileItem));
        vi.mocked(mockRepo.batchDelete).mockResolvedValueOnce(err('Database failed to delete item'));

        const result = await fileSystemService.deleteItem(fileItem.id);
        expect(result.ok).toBe(false);
        if (!result.ok) {
          expect(result.error).toBe(
            'One or more items could not be deleted due to an database error.',
          );
        }
      });
    });

  });


  describe('moveItem', () => {
    describe('validates input', () => {
      it('should return error for invalid target parent ID', async () => {
        const badParentID = '';
        const badID = '';
        const result = await fileSystemService.moveItem(badID, badParentID, 3);
        expect(result.ok).toBe(false);
      });
      it('should return an error if id === newParentId', async () => {
        const itemID = 'item-123';
        const parentID = itemID;
        const result = await fileSystemService.moveItem(itemID, parentID, 5);
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
        vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(null));
        const result = await fileSystemService.moveItem(badID, 'some-parent', 2);
        expect(result.ok).toBe(false);
        if (!result.ok) {
          expect(result.error).toBe(`Item with id ${badID} not found`);
        }
      });
      it("should handle if parentIDs are the same", async () => {
        const movingItem = { ...fileItem, parentId: folderItem.id };
        const targetDestination = folderItem.id;
        vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(movingItem));
        const result = await fileSystemService.moveItem(movingItem.id, targetDestination, 0);
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data).toEqual(movingItem);
        }
      })
      it('should move order if parentIDs are the same', async () => {
        const movingItem = { ...fileItem, parentId: folderItem.id };
        const targetDestination = folderItem.id;
        vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(movingItem));
        vi.mocked(mockRepo.update).mockResolvedValueOnce(ok({
          ...movingItem,
          order: 1,
        }))
        const result = await fileSystemService.moveItem(movingItem.id, targetDestination, 1);
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data).toEqual({
            ...movingItem,
            order: 1,
          });
        }
      })
    });
    describe('checks if target parent folder exists', () => {
      it('should return error when target parent folder not found', async () => {
        vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(fileItem));
        vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(null));
        const result = await fileSystemService.moveItem(fileItem.id, 'non-existent-parent', 2);
        expect(result.ok).toBe(false);
        if (!result.ok) {
          expect(result.error).toBe('Target parent folder does not exist.');
        }
      });
      it('should return an error if new parent is a file', async () => {
        const badParent = { ...fileItem, id: 'parent-file', parentId: undefined, type: 'file' as const };
        vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(fileItem));
        vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(badParent));
        const result = await fileSystemService.moveItem(fileItem.id, badParent.id, 2);
        expect(result.ok).toBe(false);
        if (!result.ok) {
          expect(result.error).toBe('Target parent must be a folder.');
        }

      });
      it("should return an error if user doesn't own the target parent folder", async () => {
        const anotherUsersFolder = { ...folderItem, id: 'other-user-folder', userId: 'different-user' };
        vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(fileItem));
        vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(anotherUsersFolder));
        const result = await fileSystemService.moveItem(fileItem.id, anotherUsersFolder.id, 2);
        expect(result.ok).toBe(false);
        if (!result.ok) {
          expect(result.error).toBe('Unauthorized to access target parent folder.');
        }

      });
      it('should return an error if new parent ID is in another project', async () => {
        const anotherProjectsFolder = { ...folderItem, id: 'other-project-folder', projectId: 'different-project' };
        vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(fileItem));
        vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(anotherProjectsFolder));
        const result = await fileSystemService.moveItem(fileItem.id, anotherProjectsFolder.id, 2);
        expect(result.ok).toBe(false);
        if (!result.ok) {
          expect(result.error).toBe('Target parent folder does not belong to the same project.');
        }
      });
      it("should move to root if parentId is undefined", async () => {
        const movingItem = { ...fileItem, parentId: undefined};
        vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(fileItem));
        vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(ok([]));
        vi.mocked(mockRepo.update).mockResolvedValueOnce(ok({
          ...movingItem,
          order: 0,
        }))
        const result = await fileSystemService.moveItem(movingItem.id, undefined, 0);
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data).toEqual({
            ...movingItem,
            order: 0,
          });
        }

      })
    });

    describe('prevents circular references', () => {
      it('should reject moving folder into itself', async () => {
        const movingFolder = { ...folderItem, id: 'folder-self' };
        // findById should return the moving folder when asked
        vi.mocked(mockRepo.findById).mockImplementation(async (id: string) => {
          if (id === movingFolder.id) return ok(movingFolder);
          return ok(null);
        });

        const result = await fileSystemService.moveItem(movingFolder.id, movingFolder.id, 0);
        expect(result.ok).toBe(false);
      });

      it('should reject moving folder into its direct child', async () => {
        const parent = { ...folderItem, id: 'parent-folder' };
        const child = { ...folderItem, id: 'child-folder', parentId: parent.id };

        vi.mocked(mockRepo.findById).mockImplementation(async (id: string) => {
          if (id === parent.id) return ok(parent);
          if (id === child.id) return ok(child);
          return ok(null);
        });

        const result = await fileSystemService.moveItem(parent.id, child.id, 0);
        expect(result.ok).toBe(false);
      });

      it('should reject moving folder into its descendant (grandchild)', async () => {
        const parent = { ...folderItem, id: 'parent-folder-2' };
        const child = { ...folderItem, id: 'child-folder-2', parentId: parent.id };
        const grandchild = { ...folderItem, id: 'grandchild-folder-2', parentId: child.id };

        vi.mocked(mockRepo.findById).mockImplementation(async (id: string) => {
          if (id === parent.id) return ok(parent);
          if (id === child.id) return ok(child);
          if (id === grandchild.id) return ok(grandchild);
          return ok(null);
        });

        const result = await fileSystemService.moveItem(parent.id, grandchild.id, 0);
        expect(result.ok).toBe(false);
      });

      it('should allow moving file anywhere (files cannot contain children)', async () => {
        const file = { ...fileItem, id: 'movable-file' };
        const targetFolder = { ...folderItem, id: 'some-folder', parentId: undefined };

        // findById used for the moving item and the target parent
        vi.mocked(mockRepo.findById).mockImplementation(async (id: string) => {
          if (id === file.id) return ok(file);
          if (id === targetFolder.id) return ok(targetFolder);
          return ok(null);
        });

        // findByParentId used to list target folder contents (no name conflicts)
        vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(ok([]));

        // repo.update will be called to perform the move — mock it to return the moved item
        vi.mocked(mockRepo.update).mockResolvedValueOnce(
          ok({ ...file, parentId: targetFolder.id, order: 0 }),
        );

        const result = await fileSystemService.moveItem(file.id, targetFolder.id, 0);
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data).toEqual({ ...file, parentId: targetFolder.id, order: 0 });
        }
      });

      it('should allow moving folder to an unrelated branch', async () => {
        const movingFolder = { ...folderItem, id: 'moving-folder' };
        const unrelatedFolder = { ...folderItem, id: 'unrelated-folder', parentId: undefined };

        vi.mocked(mockRepo.findById).mockImplementation(async (id: string) => {
          if (id === movingFolder.id) return ok(movingFolder);
          if (id === unrelatedFolder.id) return ok(unrelatedFolder);
          return ok(null);
        });

        // target folder has no children for conflict-check
        vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(ok([]));

        // repo.update will be called to perform the move — mock it to return the moved folder
        vi.mocked(mockRepo.update).mockResolvedValueOnce(
          ok({ ...movingFolder, parentId: unrelatedFolder.id, order: 0 }),
        );

        const result = await fileSystemService.moveItem(movingFolder.id, unrelatedFolder.id, 0);
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data).toEqual({ ...movingFolder, parentId: unrelatedFolder.id, order: 0 });
        }
      });

    });

    describe('handles name conflicts', () => {
      it('should rename item if name conflict in target folder', async () => {
        const movingItem = { ...fileItem, id: 'move-1', name: 'Doc' };
        const sibling1 = { ...fileItem, id: 'sibling-1', name: 'Doc', parentId: 'target' };
        const sibling2 = { ...fileItem, id: 'sibling-2', name: 'Doc (1)', parentId: 'target' };
        const targetFolder = { ...folderItem, id: 'target' };

        // findById should return the moving item then target parent when asked
        vi.mocked(mockRepo.findById).mockImplementation(async (id: string) => {
          if (id === movingItem.id) return ok(movingItem);
          if (id === targetFolder.id) return ok(targetFolder);
          return ok(null);
        });

        // target folder contains sibling1 and sibling2, forcing suffix to increment to (2)
        vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(ok([sibling1, sibling2]));

        // expect repo.update to return the moved item with name "Doc (2)"
        vi.mocked(mockRepo.update).mockResolvedValueOnce(
          ok({ ...movingItem, parentId: targetFolder.id, order: 0, name: 'Doc (2)' }),
        );

        const result = await fileSystemService.moveItem(movingItem.id, targetFolder.id, 0);
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data!.name).toBe('Doc (2)');
          expect(result.data!.parentId).toBe(targetFolder.id);
        }
      });

      it('should allow move is name is different only by case-insenstivity', async () => {
        const movingItem = { ...fileItem, id: 'move-2', name: 'Doc' };
        const existing = { ...fileItem, id: 'existing-1', name: 'doc', parentId: 'target' };
        const targetFolder = { ...folderItem, id: 'target' };

        vi.mocked(mockRepo.findById).mockImplementation(async (id: string) => {
          if (id === movingItem.id) return ok(movingItem);
          if (id === targetFolder.id) return ok(targetFolder);
          return ok(null);
        });

        // existing has same name differing only by case -> should NOT be treated as conflict
        vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(ok([existing]));

        vi.mocked(mockRepo.update).mockResolvedValueOnce(
          ok({ ...movingItem, parentId: targetFolder.id, order: 0, name: movingItem.name }),
        );

        const result = await fileSystemService.moveItem(movingItem.id, targetFolder.id, 0);
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data!.name).toBe('Doc');
          expect(result.data!.parentId).toBe(targetFolder.id);
        }
      });
    });

    describe('moves item successfully', () => {
      it('should move file to new parent and preserve all properties', async () => {
        const moving = { ...fileItem, id: 'move-file', isPinned: true, tags: ['a'], parentId: undefined };
        const target = { ...folderItem, id: 'target-folder' };

        vi.mocked(mockRepo.findById).mockImplementation(async (id: string) => {
          if (id === moving.id) return ok(moving);
          if (id === target.id) return ok(target);
          return ok(null);
        });

        vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(ok([]));
        vi.mocked(mockRepo.update).mockResolvedValueOnce(
          ok({ ...moving, parentId: target.id, order: 0 }),
        );

        const result = await fileSystemService.moveItem(moving.id, target.id, 0);
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data).toEqual({ ...moving, parentId: target.id, order: 0 });
        }
      });

      it('should move folder to new parent', async () => {
        const movingFolder = { ...folderItem, id: 'move-folder' };
        const target = { ...folderItem, id: 'target-folder-2' };

        vi.mocked(mockRepo.findById).mockImplementation(async (id: string) => {
          if (id === movingFolder.id) return ok(movingFolder);
          if (id === target.id) return ok(target);
          return ok(null);
        });

        vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(ok([]));
        vi.mocked(mockRepo.update).mockResolvedValueOnce(
          ok({ ...movingFolder, parentId: target.id, order: 0 }),
        );

        const result = await fileSystemService.moveItem(movingFolder.id, target.id, 0);
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data).toEqual({ ...movingFolder, parentId: target.id, order: 0 });
        }
      });

      it('should move item to root level (undefined parent)', async () => {
        const moving = { ...fileItem, id: 'move-root', parentId: 'some-parent' };

        vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(moving));
        // root has no items (no name conflicts)
        vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(ok([]));
        vi.mocked(mockRepo.update).mockResolvedValueOnce(
          ok({ ...moving, parentId: undefined, order: 5 }),
        );

        const result = await fileSystemService.moveItem(moving.id, undefined, 5);
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data).toEqual({ ...moving, parentId: undefined, order: 5 });
        }
      });

      it('should preserve isPinned status when moving', async () => {
        const moving = { ...fileItem, id: 'pinned', isPinned: true, tags: ['x'] };
        const target = { ...folderItem, id: 'target-pin' };

        vi.mocked(mockRepo.findById).mockImplementation(async (id: string) => {
          if (id === moving.id) return ok(moving);
          if (id === target.id) return ok(target);
          return ok(null);
        });

        vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(ok([]));
        vi.mocked(mockRepo.update).mockResolvedValueOnce(
          ok({ ...moving, parentId: target.id, order: 0 }),
        );

        const result = await fileSystemService.moveItem(moving.id, target.id, 0);
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data!.isPinned).toBe(true);
        }
      });

      it('should preserve tags when moving', async () => {
        const moving = { ...fileItem, id: 'tagged', tags: ['t1', 't2'] };
        const target = { ...folderItem, id: 'target-tags' };

        vi.mocked(mockRepo.findById).mockImplementation(async (id: string) => {
          if (id === moving.id) return ok(moving);
          if (id === target.id) return ok(target);
          return ok(null);
        });

        vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(ok([]));
        vi.mocked(mockRepo.update).mockResolvedValueOnce(
          ok({ ...moving, parentId: target.id, order: 0 }),
        );

        const result = await fileSystemService.moveItem(moving.id, target.id, 0);
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.data!.tags).toEqual(['t1', 't2']);
        }
      });

      it('should update updatedAt timestamp', async () => {
        const now = new Date();
        const moving = { ...fileItem, id: 'time-move', updatedAt: new Date(now.getTime() - 10000) };
        const target = { ...folderItem, id: 'time-target' };

        vi.mocked(mockRepo.findById).mockImplementation(async (id: string) => {
          if (id === moving.id) return ok(moving);
          if (id === target.id) return ok(target);
          return ok(null);
        });

        vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(ok([]));
        const updatedAt = new Date();
        vi.mocked(mockRepo.update).mockResolvedValueOnce(
          ok({ ...moving, parentId: target.id, order: 0, updatedAt }),
        );

        const result = await fileSystemService.moveItem(moving.id, target.id, 0);
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(new Date(result.data!.updatedAt).getTime()).toBeGreaterThan(moving.updatedAt.getTime());
        }
      });
    });

    describe('handles repository errors', () => {
      it('should return error when repository fails during update', async () => {
        const moving = { ...fileItem, id: 'err-update' };

        // handle repeated findById calls for both the moving item and the target parent
        vi.mocked(mockRepo.findById).mockImplementation(async (id: string) => {
          if (id === moving.id) return ok(moving);
          if (id === 'some-parent') return ok({ ...folderItem, id: 'some-parent' });
          return ok(null);
        });

        vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(ok([]));
        vi.mocked(mockRepo.update).mockResolvedValueOnce(err('DB update error'));

        const result = await fileSystemService.moveItem(moving.id, 'some-parent', 0);
        expect(result.ok).toBe(false);
        if (!result.ok) {
          expect(result.error).toBe('DB update error');
        }
      });


      it('should return error when checking destination children fails', async () => {
        const moving = { ...fileItem, id: 'err-children' };
        const target = { ...folderItem, id: 'target-err' };

        vi.mocked(mockRepo.findById).mockImplementation(async (id: string) => {
          if (id === moving.id) return ok(moving);
          if (id === target.id) return ok(target);
          return ok(null);
        });

        vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(err('DB children error'));

        const result = await fileSystemService.moveItem(moving.id, target.id, 0);
        expect(result.ok).toBe(false);
        if (!result.ok) {
          expect(result.error).toBe('DB children error');
        }
      });

      it('should return error when repository fails during target parent find');
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
    it('builds a tree and orders roots and siblings by the `order` attribute', () => {
      const items: FileSystemItem[] = [
        // roots: r1 (order 10), r2 (order 1) -> r2 should come first
        {
          id: 'r1',
          userId,
          projectId,
          name: 'R1',
          type: 'folder',
          isPinned: false,
          parentId: undefined,
          order: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'r2',
          userId,
          projectId,
          name: 'R2',
          type: 'folder',
          isPinned: false,
          parentId: undefined,
          order: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // children of r1 with orders: s2 (order 5), s1 (order 2), s3 (order 8)
        { id: 's1', userId, projectId, name: 'S1', type: 'file', parentId: 'r1', order: 2, createdAt: new Date(), updatedAt: new Date(),isPinned: false },
        { id: 's2', userId, projectId, name: 'S2', type: 'file', parentId: 'r1', order: 5, createdAt: new Date(), updatedAt: new Date(),isPinned: false },
        { id: 's3', userId, projectId, name: 'S3', type: 'file', parentId: 'r1', order: 8, createdAt: new Date(), updatedAt: new Date(),isPinned: false },
      ];

      const tree = fileSystemService.buildFolderTree(items);
      // roots should be sorted by order: r2 then r1
      expect(tree.map((n) => n.id)).toEqual(['r2', 'r1']);

      // r1's children should be sorted by order: s1, s2, s3
      const r1 = tree.find((n) => n.id === 'r1') as TreeNode;
      expect(r1.children.map((c:TreeNode) => c.id)).toEqual(['s1', 's2', 's3']);
    });

    // Keep other behavioral tests (orphaned items, children array, depth)
    it('places orphaned items at root and does not throw', () => {
      const items: FileSystemItem[] = [
        { id: 'good', userId, projectId, name: 'Good', type: 'file', parentId: undefined, order: 0, createdAt: new Date(), updatedAt: new Date(), isPinned: false },
        { id: 'orphan', userId, projectId, name: 'Orphan', type: 'file', parentId: 'nope', order: 1, createdAt: new Date(), updatedAt: new Date(), isPinned: false },
      ];
      const tree = fileSystemService.buildFolderTree(items);
      expect(tree.map((n) => n.id).sort()).toEqual(['good', 'orphan'].sort());
    });
  });
});

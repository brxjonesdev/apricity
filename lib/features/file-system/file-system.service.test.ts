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
      it('should delete an empty folder successfully');
      it('should recursively delete folder with all contents');
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

  // describe('moveItem', () => {
  //   it('should move item to another folder', async () => {
  //     const now = new Date();
  //     const moved: FileSystemItem = {
  //       ...fileItem,
  //       parentId: folderItem.id,
  //       updatedAt: now,
  //     } as FileSystemItem;
  //     vi.mocked(mockRepo.findById)
  //       .mockResolvedValueOnce(ok(fileItem)) // find item
  //       .mockResolvedValueOnce(ok(folderItem)); // find target folder
  //     vi.mocked(mockRepo.update).mockResolvedValueOnce(ok(moved));

  //     const result = await fileSystemService.moveItem(
  //       fileItem.id,
  //       folderItem.id,
  //     );
  //     expect(result.ok).toBe(true);
  //     if (result.ok) {
  //       expect(result.data).toEqual(moved);
  //     }
  //     expect(mockRepo.findById).toHaveBeenCalledWith(fileItem.id, userId);
  //     expect(mockRepo.findById).toHaveBeenCalledWith(folderItem.id, userId);
  //     expect(mockRepo.update).toHaveBeenCalledWith(
  //       fileItem.id,
  //       userId,
  //       expect.objectContaining({ parentId: folderItem.id }),
  //     );
  //   });

  //   it('should move item to root level', async () => {
  //     const now = new Date();
  //     const moved: FileSystemItem = {
  //       ...fileItem,
  //       parentId: undefined,
  //       updatedAt: now,
  //     } as FileSystemItem;
  //     vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(fileItem));
  //     vi.mocked(mockRepo.update).mockResolvedValueOnce(ok(moved));

  //     const result = await fileSystemService.moveItem(fileItem.id, undefined);
  //     expect(result.ok).toBe(true);
  //     if (result.ok) {
  //       expect(result.data).toEqual(moved);
  //     }
  //     expect(mockRepo.update).toHaveBeenCalledWith(
  //       fileItem.id,
  //       userId,
  //       expect.objectContaining({ parentId: undefined }),
  //     );
  //   });

  //   it('should prevent moving folder into itself', async () => {
  //     vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(folderItem));
  //     const result = await fileSystemService.moveItem(
  //       folderItem.id,
  //       folderItem.id,
  //     );
  //     expect(result.ok).toBe(false);
  //     if (!result.ok) {
  //       expect(result.error).toMatch(/cannot move.*itself/i);
  //     }
  //   });

  //   it('should prevent moving folder into its descendant', async () => {
  //     const parent = { ...folderItem, id: 'f-parent' } as FileSystemItem;
  //     const child = {
  //       ...folderItem,
  //       id: 'f-child',
  //       parentId: 'f-parent',
  //     } as FileSystemItem;
  //     vi.mocked(mockRepo.findById)
  //       .mockResolvedValueOnce(ok(parent)) // item being moved
  //       .mockResolvedValueOnce(ok(child)); // target folder (child)
  //     // mock findByParentId to return child's children when traversing ancestry
  //     vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(
  //       ok([
  //         {
  //           id: 'f-child',
  //           userId,
  //           name: 'child',
  //           type: 'folder',
  //           createdAt: new Date(),
  //           updatedAt: new Date(),
  //         } as FileSystemItem,
  //       ]),
  //     );
  //     const result = await fileSystemService.moveItem(parent.id, child.id);
  //     expect(result.ok).toBe(false);
  //     if (!result.ok) {
  //       expect(result.error).toMatch(/descendant/i);
  //     }
  //   });

  //   it('should return error when target folder does not exist', async () => {
  //     vi.mocked(mockRepo.findById)
  //       .mockResolvedValueOnce(ok(fileItem)) // item
  //       .mockResolvedValueOnce(err('Item with id target not found')); // target
  //     const result = await fileSystemService.moveItem(fileItem.id, 'target');
  //     expect(result.ok).toBe(false);
  //     if (!result.ok) {
  //       expect(result.error).toMatch(/target folder/i);
  //     }
  //   });

  //   it('should return error when item not found', async () => {
  //     vi.mocked(mockRepo.findById).mockResolvedValueOnce(
  //       err('Item with id missing not found'),
  //     );
  //     const result = await fileSystemService.moveItem('missing', 'any');
  //     expect(result.ok).toBe(false);
  //     if (!result.ok) {
  //       expect(result.error).toMatch(/not found/i);
  //     }
  //   });

  //   it('should return error when repository fails', async () => {
  //     vi.mocked(mockRepo.findById)
  //       .mockResolvedValueOnce(ok(fileItem))
  //       .mockResolvedValueOnce(ok(folderItem));
  //     vi.mocked(mockRepo.update).mockResolvedValueOnce(err('DB update failed'));
  //     const result = await fileSystemService.moveItem(
  //       fileItem.id,
  //       folderItem.id,
  //     );
  //     expect(result.ok).toBe(false);
  //     if (!result.ok) {
  //       expect(result.error).toBe('DB update failed');
  //     }
  //   });
  // });

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

  // describe('buildFolderTree', () => {
  //   it('should build a tree from flat list of items', async () => {
  //     const root: FileSystemItem = {
  //       id: 'r',
  //       userId,
  //       projectId,
  //       name: 'root',
  //       type: 'folder',
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     } as FileSystemItem;
  //     const child: FileSystemItem = {
  //       id: 'c',
  //       userId,
  //       projectId,
  //       name: 'child',
  //       type: 'folder',
  //       parentId: 'r',
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     } as FileSystemItem;
  //     const file: FileSystemItem = {
  //       id: 'f',
  //       userId,
  //       projectId,
  //       name: 'file',
  //       type: 'file',
  //       parentId: 'c',
  //       content: 'x',
  //       size: 1,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     } as FileSystemItem;

  //     const tree = fileSystemService.buildFolderTree([
  //       root,
  //       child,
  //       file,
  //     ]) as TreeNode[];

  //     expect(tree).toHaveLength(1); // one root item
  //     expect(tree[0].id).toBe('r');
  //     expect(tree[0].children).toHaveLength(1);
  //     expect(tree[0].children[0].id).toBe('c');
  //     expect(tree[0].children[0].children).toHaveLength(1);
  //     expect(tree[0].children[0].children[0].id).toBe('f');
  //   });

  //   it('should handle items with no parent (root level)', async () => {
  //     const a: FileSystemItem = {
  //       id: 'a',
  //       userId,
  //       projectId,
  //       name: 'A',
  //       type: 'file',
  //       content: 'test',
  //       size: 4,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     } as FileSystemItem;

  //     const tree = (await fileSystemService.buildFolderTree([a])) as TreeNode[];

  //     expect(tree).toHaveLength(1);
  //     expect(tree[0].id).toBe('a');
  //     expect(tree[0].children).toHaveLength(0);
  //   });

  //   it('should handle nested folders', async () => {
  //     const a: FileSystemItem = {
  //       id: 'a',
  //       userId,
  //       projectId,
  //       name: 'A',
  //       type: 'folder',
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     } as FileSystemItem;
  //     const b: FileSystemItem = {
  //       id: 'b',
  //       userId,
  //       projectId,
  //       name: 'B',
  //       type: 'folder',
  //       parentId: 'a',
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     } as FileSystemItem;
  //     const c: FileSystemItem = {
  //       id: 'c',
  //       userId,
  //       projectId,
  //       name: 'C',
  //       type: 'file',
  //       parentId: 'b',
  //       content: 'x',
  //       size: 1,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     } as FileSystemItem;

  //     const tree = (await fileSystemService.buildFolderTree([
  //       a,
  //       b,
  //       c,
  //     ])) as TreeNode[];

  //     expect(tree).toHaveLength(1);
  //     expect(tree[0].id).toBe('a');
  //     expect(tree[0].children).toHaveLength(1);
  //     expect(tree[0].children[0].id).toBe('b');
  //     expect(tree[0].children[0].children).toHaveLength(1);
  //     expect(tree[0].children[0].children[0].id).toBe('c');
  //   });

  //   it('should handle empty list', async () => {
  //     const tree = (await fileSystemService.buildFolderTree([])) as TreeNode[];

  //     expect(tree).toEqual([]);
  //   });

  //   it('should handle multiple root items', async () => {
  //     const a: FileSystemItem = {
  //       id: 'a',
  //       userId,
  //       projectId,
  //       name: 'A',
  //       type: 'folder',
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     } as FileSystemItem;
  //     const b: FileSystemItem = {
  //       id: 'b',
  //       userId,
  //       projectId,
  //       name: 'B',
  //       type: 'file',
  //       content: 'test',
  //       size: 4,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     } as FileSystemItem;

  //     const tree = fileSystemService.buildFolderTree([
  //       a,
  //       b,
  //     ]) as TreeNode[];
  //     expect(tree).toHaveLength(2);
  //     expect(tree[0].id).toBe('a');
  //     expect(tree[1].id).toBe('b');
  //     expect(tree[0].children).toHaveLength(0);
  //     expect(tree[1].children).toHaveLength(0);
  //   });

  //   it('should handle orphaned items', async () => {
  //     // An item referencing a parent id that does not exist
  //     const orphan: FileSystemItem = {
  //       id: 'o',
  //       userId,
  //       projectId,
  //       name: 'Orphan',
  //       type: 'file',
  //       parentId: 'nope', // non-existent parent
  //       content: 'orphaned',
  //       size: 8,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     } as FileSystemItem;

  //     const tree = fileSystemService.buildFolderTree([orphan]) as TreeNode[];

  //     // Orphaned items should still appear in the tree (at root level as fallback)
  //     expect(tree).toHaveLength(1);
  //     expect(tree[0].id).toBe('o');
  //     expect(tree[0].children).toHaveLength(0);
  //   });

  //   it('should handle mixed root and nested items', async () => {
  //     const rootFile: FileSystemItem = {
  //       id: 'rf',
  //       userId,
  //       projectId,
  //       name: 'RootFile',
  //       type: 'file',
  //       content: 'root',
  //       size: 4,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     } as FileSystemItem;
  //     const folder: FileSystemItem = {
  //       id: 'fold',
  //       userId,
  //       projectId,
  //       name: 'Folder',
  //       type: 'folder',
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     } as FileSystemItem;
  //     const nestedFile: FileSystemItem = {
  //       id: 'nf',
  //       userId,
  //       projectId,
  //       name: 'NestedFile',
  //       type: 'file',
  //       parentId: 'fold',
  //       content: 'nested',
  //       size: 6,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     } as FileSystemItem;

  //     const tree = fileSystemService.buildFolderTree([
  //       rootFile,
  //       folder,
  //       nestedFile,
  //     ]) as TreeNode[];

  //     expect(tree).toHaveLength(2); // rootFile and folder at root
  //     const folderNode = tree.find((n) => n.id === 'fold');
  //     expect(folderNode).toBeDefined();
  //     expect(folderNode!.children).toHaveLength(1);
  //     expect(folderNode!.children[0].id).toBe('nf');
  //   });
  // });

  // describe('integration scenarios', () => {
  //   it('should create folder, add file, then retrieve contents', async () => {
  //     const createdFolder: FileSystemItem = {
  //       ...newFolderDTO,
  //       id: 'folder-int-1',
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     } as FileSystemItem;
  //     vi.mocked(mockRepo.create).mockResolvedValueOnce(ok(createdFolder));
  //     const resFolder = await fileSystemService.createItem(newFolderDTO);
  //     expect(resFolder.ok).toBe(true);
  //     if (resFolder.ok) expect(resFolder.data).toEqual(createdFolder);
  //     // add file
  //     const fileDTO = { ...newFileDTO, parentId: createdFolder.id };
  //     const createdFile: FileSystemItem = {
  //       ...fileDTO,
  //       id: 'file-int-1',
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //       size: fileDTO.content!.length,
  //     } as FileSystemItem;
  //     vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(createdFolder)); // for parent check
  //     vi.mocked(mockRepo.create).mockResolvedValueOnce(ok(createdFile));
  //     const resFile = await fileSystemService.createItem(fileDTO);
  //     expect(resFile.ok).toBe(true);
  //     if (resFile.ok) expect(resFile.data).toEqual(createdFile);
  //     // retrieving contents
  //     vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(
  //       ok([createdFile]),
  //     );
  //     const contents = await fileSystemService.getFolderContents(
  //       createdFolder.id,
  //     );
  //     expect(contents.ok).toBe(true);
  //     if (contents.ok) expect(contents.data).toEqual([createdFile]);
  //   });

  //   it('should move file between folders', async () => {
  //     const srcFolder: FileSystemItem = {
  //       id: 'src',
  //       userId,
  //       name: 'Src',
  //       type: 'folder',
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     } as FileSystemItem;
  //     const dstFolder: FileSystemItem = {
  //       id: 'dst',
  //       userId,
  //       name: 'Dst',
  //       type: 'folder',
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     } as FileSystemItem;
  //     const fileToMove: FileSystemItem = {
  //       ...fileItem,
  //       parentId: srcFolder.id,
  //     } as FileSystemItem;
  //     vi.mocked(mockRepo.findById)
  //       .mockResolvedValueOnce(ok(fileToMove)) // find item
  //       .mockResolvedValueOnce(ok(dstFolder)); // target folder
  //     const moved = {
  //       ...fileToMove,
  //       parentId: dstFolder.id,
  //       updatedAt: new Date(),
  //     } as FileSystemItem;
  //     vi.mocked(mockRepo.update).mockResolvedValueOnce(ok(moved));
  //     const result = await fileSystemService.moveItem(
  //       fileToMove.id,
  //       dstFolder.id,
  //     );
  //     expect(result.ok).toBe(true);
  //     if (result.ok) expect(result.data).toEqual(moved);
  //   });

  //   it('should rename folder and verify all children maintain reference', async () => {
  //     const parent: FileSystemItem = {
  //       id: 'p',
  //       userId,
  //       name: 'Parent',
  //       type: 'folder',
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     } as FileSystemItem;
  //     const child: FileSystemItem = {
  //       id: 'ch',
  //       userId,
  //       name: 'Child',
  //       type: 'file',
  //       parentId: 'p',
  //       content: 'x',
  //       size: 1,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     } as FileSystemItem;
  //     vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(parent));
  //     vi.mocked(mockRepo.update).mockResolvedValueOnce(
  //       ok({
  //         ...parent,
  //         name: 'Parent Renamed',
  //         updatedAt: new Date(),
  //       } as FileSystemItem),
  //     );
  //     // renaming parent should not change child's parentId; we assert that when fetching child later
  //     const renameRes = await fileSystemService.updateItem(parent.id, {
  //       name: 'Parent Renamed',
  //     });
  //     expect(renameRes.ok).toBe(true);
  //     vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(child));
  //     const childFetch = await fileSystemService.getItem(child.id);
  //     expect(childFetch.ok).toBe(true);
  //     if (childFetch.ok) expect(childFetch.data.parentId).toBe(parent.id);
  //   });

  //   it('should delete folder and verify children are deleted', async () => {
  //     const parent: FileSystemItem = {
  //       id: 'pdel',
  //       userId,
  //       name: 'ParentDel',
  //       type: 'folder',
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     } as FileSystemItem;
  //     const child: FileSystemItem = {
  //       id: 'cdel',
  //       userId,
  //       name: 'ChildDel',
  //       type: 'file',
  //       parentId: 'pdel',
  //       content: 'y',
  //       size: 1,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     } as FileSystemItem;
  //     vi.mocked(mockRepo.findById).mockResolvedValueOnce(ok(parent));
  //     vi.mocked(mockRepo.findByParentId).mockResolvedValueOnce(ok([child]));
  //     // ensure delete called for child then parent
  //     vi.mocked(mockRepo.delete).mockResolvedValue(ok(null));
  //     const delRes = await fileSystemService.deleteItem(parent.id);
  //     expect(delRes.ok).toBe(true);
  //     expect(mockRepo.delete).toHaveBeenCalledWith(child.id, userId);
  //     expect(mockRepo.delete).toHaveBeenCalledWith(parent.id, userId);
  //   });
  // });
});

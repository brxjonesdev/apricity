import { createFileSystemService } from "./file-system.service";
import { createInMemoryFileSystemRepository } from "./file-system.repo";

const fsRepository = createInMemoryFileSystemRepository();

export const createFileSystem = (userId: string, projectId: string) => {
  return createFileSystemService(userId, projectId, fsRepository);
};

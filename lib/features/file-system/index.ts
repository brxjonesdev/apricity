import { createFileSystemService } from "./file-system.service";
import { createFileSystemRepository } from "./file-system.repo";

const fsRepository = createFileSystemRepository();

export const createFileSystem = (userId: string, projectId: string) => {
  console.log(userId, 'duo')
  return createFileSystemService(userId, projectId, fsRepository);
};

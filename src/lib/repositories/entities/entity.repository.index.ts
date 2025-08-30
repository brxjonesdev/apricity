import { BaseEntity, Result } from "@/lib/types";

export interface EntityRepository<T extends BaseEntity> {
  create(entity: T): Promise<Result<T, string>>;
  update(id: string, entity: Partial<T>): Promise<Result<T, string>>;
  delete(id: string): Promise<Result<boolean, string>>;
  getById(id: string): Promise<Result<T, string>>;
  getAllByProject(projectId: string): Promise<Result<T[], string>>;
}
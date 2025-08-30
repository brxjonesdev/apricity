import { BaseEntity } from "@/lib/types";

export interface EntityRepository<T extends BaseEntity> {
  create(entity: T): Promise<T>;
  update(id: string, entity: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
  getById(id: string): Promise<T | null>;
  getAllByProject(projectId: string): Promise<T[]>;
}
import { BaseEntity } from "@/lib/types";

export interface BaseEntityRepository {
  create(entity: BaseEntity): Promise<BaseEntity>;
  findById(id: string): Promise<BaseEntity | null>;
  findAll(): Promise<BaseEntity[]>;
  update(id: string, entity: BaseEntity): Promise<BaseEntity | null>;
  delete(id: string): Promise<boolean>;
}

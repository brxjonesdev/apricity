import { EntityRepository } from "./entity.repository.index";
import { Object } from "@/lib/types";

export interface ObjectRepository extends EntityRepository<Object> {
  findByProperty(key: string, value: any): Promise<Object[]>;
  getObjectsUsedByCharacter(characterId: string): Promise<Object[]>;
  getLegendaryObjects(): Promise<Object[]>; // e.g. flagged rare/important items
}

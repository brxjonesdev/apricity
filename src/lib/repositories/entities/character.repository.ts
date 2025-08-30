import { Character } from "@/lib/types";
import { EntityRepository } from "./entity.repository.index";

export interface CharacterRepository extends EntityRepository<Character> {
  findByName(name: string): Promise<Character | null>;
  searchByQuery(query: string): Promise<Character[]>;
}

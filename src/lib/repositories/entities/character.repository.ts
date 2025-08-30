import { Character } from "@/lib/types";
import { BaseEntityRepository } from "./entity.repository.index";

export interface CharacterRepository extends BaseEntityRepository {
  findByName(name: string): Promise<Character | null>;
  findByRace(race: string): Promise<Character[]>;
}

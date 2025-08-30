import { Faction } from "@/lib/types";
import { EntityRepository } from "./entity.repository.index";

export interface FactionRepository extends EntityRepository<Faction> {
  getByMember(characterId: string): Promise<Faction[]>;
  getByGoal(goal: string): Promise<Faction[]>;
  getRivalries(factionId: string): Promise<Faction[]>; 
}

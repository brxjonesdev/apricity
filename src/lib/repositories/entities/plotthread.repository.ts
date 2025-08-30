import { PlotThread } from "@/lib/types";
import { EntityRepository } from "./entity.repository.index";

export interface PlotThreadRepository extends EntityRepository<PlotThread> {
  findByConflict(conflict: string): Promise<PlotThread[]>;
  findByResolution(resolution: string): Promise<PlotThread[]>;
  getActiveThreads(projectId: string): Promise<PlotThread[]>;
  getThreadsInvolvingCharacter(characterId: string): Promise<PlotThread[]>;
}

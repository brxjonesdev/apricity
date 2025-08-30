import { EntityRepository } from "./entity.repository.index";
import { Event } from "@/lib/types";

export interface EventRepository extends EntityRepository<Event> {
  getByDateRange(start: Date, end: Date): Promise<Event[]>;
  getByParticipant(characterId: string): Promise<Event[]>;
  getByLocation(locationId: string): Promise<Event[]>;
  getChronology(projectId: string): Promise<Event[]>; // timeline
}

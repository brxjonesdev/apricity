import { EntityRepository } from "./entity.repository.index";
import { Location } from "@/lib/types";

export interface LocationRepository extends EntityRepository<Location> {
  findByCoordinates(x: number, y: number): Promise<Location | null>;
  searchByNameOrDescription(query: string): Promise<Location[]>;
  getEventsAtLocation(locationId: string): Promise<Event[]>;
  getChildrenLocations(locationId: string): Promise<Location[]>;
}

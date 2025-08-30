import { Relationship, RelationshipCreate, RelationshipUpdate } from "../types";

export interface RelationshipRepository {
  createRelationship(data: RelationshipCreate): Promise<Relationship>;
  getRelationshipById(id: string): Promise<Relationship | null>;
  getAllRelationships(): Promise<Relationship[]>;
  updateRelationship(id: string, data: RelationshipUpdate): Promise<Relationship | null>;
  deleteRelationship(id: string): Promise<boolean>;
  findRelationshipsForEntity(entityId: string): Promise<Relationship[]>;
  findRelationshipsBetweenEntities(entityId1: string, entityId2: string): Promise<Relationship[]>;
  deleteRelationshipsForEntity(entityId: string): Promise<boolean>;
}

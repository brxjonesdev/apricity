import { nanoid } from "nanoid";
import { Relationship, RelationshipCreate, RelationshipUpdate, Result, ok, err } from "../types";

export interface RelationshipRepository {
  createRelationship(data: RelationshipCreate): Promise<Result<Relationship, string>>;
  getRelationshipById(id: string): Promise<Result<Relationship, string>>;
  getAllRelationships(): Promise<Result<Relationship[], string>>;
  updateRelationship(id: string, data: RelationshipUpdate): Promise<Result<Relationship, string>>;
  deleteRelationship(id: string): Promise<Result<boolean, string>>;
  findRelationshipsForEntity(entityId: string): Promise<Result<Relationship[], string>>;
  findRelationshipsBetweenEntities(entityId1: string, entityId2: string): Promise<Result<Relationship[], string>>;
  deleteRelationshipsForEntity(entityId: string): Promise<Result<boolean, string>>;
}

export function createInMemoryRelationshipRepository(): RelationshipRepository {
  const relationships: Relationship[] = [];

  return {
    async createRelationship(data: RelationshipCreate) {
      const relationship: Relationship = {
        id: `relationship-${nanoid(32)}`,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      relationships.push(relationship);
      return ok(relationship);
    },

    async getRelationshipById(id: string) {
      const relationship = relationships.find(rel => rel.id === id);
      return relationship ? ok(relationship) : err("Relationship not found");
    },

    async getAllRelationships() {
      return ok([...relationships]);
    },

    async updateRelationship(id: string, data: RelationshipUpdate) {
      const index = relationships.findIndex(rel => rel.id === id);
      if (index === -1) return err("Relationship not found");
      const updatedRelationship: Relationship = {
        ...relationships[index],
        ...data,
        updatedAt: new Date()
      };
      relationships[index] = updatedRelationship;
      return ok(updatedRelationship);
    },

    async deleteRelationship(id: string) {
      const index = relationships.findIndex(rel => rel.id === id);
      if (index === -1) return err("Relationship not found");
      relationships.splice(index, 1);
      return ok(true);
    },

    async findRelationshipsForEntity(entityId: string) {
      return ok(relationships.filter(rel => rel.fromEntityID === entityId || rel.toEntityID === entityId));
    },

    async findRelationshipsBetweenEntities(entityId1: string, entityId2: string) {
      return ok(relationships.filter(rel =>
        (rel.fromEntityID === entityId1 && rel.toEntityID === entityId2) ||
        (rel.fromEntityID === entityId2 && rel.toEntityID === entityId1)
      ));
    },

    async deleteRelationshipsForEntity(entityId: string) {
      const initialLength = relationships.length;
      const newRelationships = relationships.filter(rel => rel.fromEntityID !== entityId && rel.toEntityID !== entityId);
      relationships.length = 0;
      relationships.push(...newRelationships);
      return ok(initialLength !== relationships.length);
    }
  };
}
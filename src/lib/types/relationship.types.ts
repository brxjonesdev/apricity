import { EntityType } from "./entity.types";

export interface Relationship {
  id: string;
  projectId: string;
  fromEntity: string; // format: "characters:char_123"
  toEntity: string; // format: "locations:loc_456"
  relationshipType: string;
  strength: number; // 0-1
  description?: string;
  attributes: Record<string, any>;
  createdAt: Date;
}

export interface RelationshipCreate extends Omit<Relationship, 'id' | 'createdAt'> {}

export interface RelationshipUpdate extends Partial<RelationshipCreate> {}

export interface DocumentEntityAssociation {
  id: string;
  documentId: string;
  entityType: EntityType;
  entityId: string;
  importance: number; // 0-1, how important this entity is to this document
  context?: string; // brief note about how/why it appears
  createdAt: Date;
}

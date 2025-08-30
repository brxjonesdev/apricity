import { DocumentStatus } from "./document.types";
import { EntityType, WorldEntity } from "./entity.types";

export interface SearchQuery {
  text: string;
  entityTypes: EntityType[];
  documentTypes: DocumentType[];
  statuses: DocumentStatus[];
  labels: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface SearchResult {
  id: string;
  type: 'document' | 'entity';
  title: string;
  excerpt?: string;
  matchedFields: string[];
  score: number;
  data: Document | WorldEntity;
}
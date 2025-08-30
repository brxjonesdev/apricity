import { DocumentCreate, DocumentEntityAssociation, DocumentUpdate, EntityType } from "../types";

export interface DocumentRepository {
  createDocument(data: DocumentCreate): Promise<Document>;
  getDocumentById(id: string): Promise<Document | null>;
  getAllDocuments(): Promise<Document[]>;
  updateDocument(id: string, data: DocumentUpdate): Promise<Document | null>;
  deleteDocument(id: string): Promise<boolean>;
  findByType(type: DocumentType): Promise<Document[]>;
  findByProjectId(projectId: string): Promise<Document[]>;
  findByParentId(parentId: string): Promise<Document[]>;
  updateWordCount(id: string, wordCount: number): Promise<Document | null>;
  updateContent(id: string, content: string): Promise<Document | null>;
  reorderChildren(parentId: string, order: string[]): Promise<Document[] | null>;
  moveDocument(id: string, newParentId: string): Promise<Document | null>;
  fullTextSearch(query: string): Promise<Document[]>;
  createEntityAssociation(documentId: string, entityId: string, entityType: EntityType): Promise<DocumentEntityAssociation>;
  deleteEntityAssociation(id: string): Promise<boolean>;
  linkEntities(documentId: string, entityIds: string[], entityType: EntityType): Promise<DocumentEntityAssociation[]>;
  unlinkEntities(documentId: string, entityIds: string[]): Promise<boolean>;
  updateEntityImportance(id: string, importance: number): Promise<DocumentEntityAssociation | null>;
}

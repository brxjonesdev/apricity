import { 
  Document, 
  DocumentCreate, 
  DocumentEntityAssociation, 
  DocumentUpdate, 
  DocumentType, 
  EntityType, 
  Result, 
  ok, 
  err 
} from "../types";
import { nanoid } from "nanoid";

export interface DocumentRepository {
  createDocument(data: DocumentCreate): Promise<Result<Document, string>>;
  getDocumentById(id: string): Promise<Result<Document, string>>;
  getAllDocuments(): Promise<Result<Document[], string>>;
  updateDocument(id: string, data: DocumentUpdate): Promise<Result<Document, string>>;
  deleteDocument(id: string): Promise<Result<boolean, string>>;
  findByType(type: DocumentType): Promise<Result<Document[], string>>;
  findByProjectId(projectId: string): Promise<Result<Document[], string>>;
  findByParentId(parentId: string): Promise<Result<Document[], string>>;
  updateWordCount(id: string, wordCount: number): Promise<Result<Document, string>>;
  updateContent(id: string, content: string): Promise<Result<Document, string>>;
  reorderChildren(parentId: string, order: string[]): Promise<Result<Document[], string>>;
  moveDocument(id: string, newParentId: string): Promise<Result<Document, string>>;
  fullTextSearch(query: string): Promise<Result<Document[], string>>;
  createEntityAssociation(documentId: string, entityId: string, entityType: EntityType): Promise<Result<DocumentEntityAssociation, string>>;
  deleteEntityAssociation(id: string): Promise<Result<boolean, string>>;
  linkEntities(documentId: string, entityIds: string[], entityType: EntityType): Promise<Result<DocumentEntityAssociation[], string>>;
  unlinkEntities(documentId: string, entityIds: string[]): Promise<Result<boolean, string>>;
  updateEntityImportance(id: string, importance: number): Promise<Result<DocumentEntityAssociation, string>>;
}

export function createInMemoryDocumentRepository(): DocumentRepository {
  const documents: Document[] = [];
  const entityAssociations: DocumentEntityAssociation[] = [];

  return {
    async createDocument(data: DocumentCreate) {
      const document: Document = {
        id: `document-${nanoid(32)}`,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      documents.push(document);
      return ok(document);
    },

    async getDocumentById(id: string) {
      const document = documents.find(doc => doc.id === id);
      return document ? ok(document) : err("Document not found");
    },

    async getAllDocuments() {
      return ok([...documents]);
    },

    async updateDocument(id: string, data: DocumentUpdate) {
      const index = documents.findIndex(doc => doc.id === id);
      if (index === -1) return err("Document not found");
      const updatedDocument: Document = {
        ...documents[index],
        ...data,
        updatedAt: new Date()
      };
      documents[index] = updatedDocument;
      return ok(updatedDocument);
    },

    async deleteDocument(id: string) {
      const index = documents.findIndex(doc => doc.id === id);
      if (index === -1) return err("Document not found");
      documents.splice(index, 1);
      return ok(true);
    },

    async findByType(type: DocumentType) {
      const results = documents.filter(doc => doc.type === type);
      return ok(results);
    },

    async findByProjectId(projectId: string) {
      const results = documents.filter(doc => doc.projectID === projectId);
      return ok(results);
    },

    async findByParentId(parentId: string) {
      const results = documents.filter(doc => doc.parentID === parentId);
      return ok(results);
    },

    async updateWordCount(id: string, wordCount: number) {
      const doc = documents.find(d => d.id === id);
      if (!doc) return err("Document not found");
      doc.wordCount = wordCount;
      doc.updatedAt = new Date();
      return ok(doc);
    },

    async updateContent(id: string, content: string) {
      const doc = documents.find(d => d.id === id);
      if (!doc) return err("Document not found");
      doc.contentHash = content;
      doc.updatedAt = new Date();
      return ok(doc);
    },

    async reorderChildren(parentId: string, order: string[]) {
      const children = documents.filter(doc => doc.parentID === parentId);
      if (children.length !== order.length) {
        return err("Order does not match children count");
      }
      const reordered = order.map(id => documents.find(doc => doc.id === id)!).filter(Boolean);
      return ok(reordered);
    },

    async moveDocument(id: string, newParentId: string) {
      const doc = documents.find(d => d.id === id);
      if (!doc) return err("Document not found");
      doc.parentID = newParentId;
      doc.updatedAt = new Date();
      return ok(doc);
    },

    async fullTextSearch(query: string) {
      const q = query.toLowerCase();
      const results = documents.filter(doc =>
        (doc.title?.toLowerCase().includes(q)) ||
        (doc.contentHash?.toLowerCase().includes(q))
      );
      return ok(results);
    },

    async createEntityAssociation(documentId: string, entityId: string, entityType: EntityType) {
      const assoc: DocumentEntityAssociation = {
        id: `assoc-${nanoid(32)}`,
        documentId,
        entityId,
        entityType,
        importance: 1,
        createdAt: new Date()
      };
      entityAssociations.push(assoc);
      return ok(assoc);
    },

    async deleteEntityAssociation(id: string) {
      const index = entityAssociations.findIndex(ea => ea.id === id);
      if (index === -1) return err("Association not found");
      entityAssociations.splice(index, 1);
      return ok(true);
    },

    async linkEntities(documentId: string, entityIds: string[], entityType: EntityType) {
      const newLinks: DocumentEntityAssociation[] = entityIds.map(entityId => ({
        id: `assoc-${nanoid(32)}`,
        documentId,
        entityId,
        entityType,
        importance: 1,
        createdAt: new Date(),
      }));
      entityAssociations.push(...newLinks);
      return ok(newLinks);
    },

    async unlinkEntities(documentId: string, entityIds: string[]) {
      let removed = false;
      for (const entityId of entityIds) {
        const index = entityAssociations.findIndex(ea => ea.documentId === documentId && ea.entityId === entityId);
        if (index !== -1) {
          entityAssociations.splice(index, 1);
          removed = true;
        }
      }
      return removed ? ok(true) : err("No associations found to unlink");
    },

    async updateEntityImportance(id: string, importance: number) {
      const assoc = entityAssociations.find(ea => ea.id === id);
      if (!assoc) return err("Association not found");
      assoc.importance = importance;
      return ok(assoc);
    }
  };
}

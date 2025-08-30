import { SearchResult } from "../types";

export interface SearchRepository {
  searchWholeProject(query: string): Promise<SearchResult[]>;
  searchInDocument(documentId: string, query: string): Promise<SearchResult[]>;
  searchInEntity(entityId: string, query: string): Promise<SearchResult[]>;
  getRecentSearches(limit: number): Promise<string[]>;
}

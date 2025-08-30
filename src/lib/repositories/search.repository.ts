import { SearchResult, Result, err, ok, Document, BaseEntity } from "../types";

export interface SearchRepository {
  searchWholeProject(query: string): Promise<Result<SearchResult[], string>>;
  searchInDocument(documentId: string, query: string): Promise<Result<SearchResult[], string>>;
  searchInEntity(entityId: string, query: string): Promise<Result<SearchResult[], string>>;
  getRecentSearches(limit: number): Promise<Result<string[], string>>;
}

export function createInMemorySearchRepository(): SearchRepository {
  const recentSearches: string[] = [];


  return {
    async searchWholeProject(query: string) {
      // Simulate search
      const results: SearchResult[] = [];
      recentSearches.push(query);
      return ok(results);
    },

    async searchInDocument(documentId: string, query: string) {
      // Simulate search
      const results: SearchResult[] = [];
      recentSearches.push(query);
      return ok(results);
    },

    async searchInEntity(entityId: string, query: string) {
      // Simulate search
      const results: SearchResult[] = [];
      recentSearches.push(query);
      return ok(results);
    },

    async getRecentSearches(limit: number) {
      return ok(recentSearches.slice(-limit));
    }
  };
}
import { EntityAnalytics, ProjectAnalytics, Result, ok, err } from "../types";

export interface AnalyticsRepository {
  getProjectStats(projectId: string): Result<ProjectAnalytics, string>;
  getEntityStats(entityId: string): Result<EntityAnalytics, string>;
  getMostActiveEntities(projectId: string): Result<EntityAnalytics[], string>;
  getNeglectedEntities(projectId: string): Result<EntityAnalytics[], string>;
}

export function createInMemoryAnalyticsRepository(): AnalyticsRepository {

  const projectStats: Record<string, ProjectAnalytics> = {
    "project-1": {
      totalDocuments: 5,
      totalWords: 12000,
      chaptersCount: 10,
      scenesCount: 25,
      charactersCount: 8,
      locationsCount: 4,
      averageWordsPerDocument: 2400,
      documentsModifiedToday: 2,
      wordsWrittenToday: 1500,
      progressToGoal: 0.6, // 60%
    },
  };

  const entityStats: Record<string, EntityAnalytics> = {
    "entity-1": {
      entityId: "entity-1",
      entityName: "Alice",
      entityType: "character",
      appearances: 12,
      totalWordsInvolved: 350,
      documentsAppeared: ["doc-1", "doc-2"],
      relationshipCount: 3,
    },
    "entity-2": {
      entityId: "entity-2",
      entityName: "Acme Corp",
      entityType: "faction",
      appearances: 7,
      totalWordsInvolved: 210,
      documentsAppeared: ["doc-2", "doc-3"],
      relationshipCount: 2,
    },
    "entity-3": {
      entityId: "entity-3",
      entityName: "Paris",
      entityType: "location",
      appearances: 3,
      totalWordsInvolved: 80,
      documentsAppeared: ["doc-1"],
      relationshipCount: 1,
    },
  };
  return {
    getProjectStats: (projectId: string) => {
      const stats = projectStats[projectId];
      if (!stats) {
        return err("Project not found");
      }
      return ok(stats);
    },
    getEntityStats: (entityId: string) => {
      const stats = entityStats[entityId];
      if (!stats) {
        return err("Entity not found");
      }
      return ok(stats);
    },
    getMostActiveEntities: (projectId: string) => {
      // gets all entities for a project
      const entities = Object.values(entityStats).filter(entity => entity.documentsAppeared.some(doc => doc.startsWith(`doc-${projectId}`)));
      // get the ones with the most appearances
      const mostActiveEntities = entities.sort((a, b) => b.appearances - a.appearances).slice(0, 5);
      return ok(mostActiveEntities);
    },
    getNeglectedEntities: (projectId: string) => {
      // gets all entities for a project
      const entities = Object.values(entityStats).filter(entity => entity.documentsAppeared.some(doc => doc.startsWith(`doc-${projectId}`)));
      // get the ones with the least appearances
      const neglectedEntities = entities.sort((a, b) => a.appearances - b.appearances).slice(0, 5);
      return ok(neglectedEntities);
    },
  };
}

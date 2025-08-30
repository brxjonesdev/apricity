import { EntityAnalytics, ProjectAnalytics } from "../types";

export interface AnalyticsRepository {
  getProjectStats(projectId: string): Promise<ProjectAnalytics>;
  getEntityStats(entityId: string): Promise<EntityAnalytics>;
  getMostActiveEntities(projectId: string): Promise<EntityAnalytics[]>;
  getNeglectedEntities(projectId: string): Promise<EntityAnalytics[]>;
}

export type EntityType = 'character' | 'location' | 'plot_thread' | 'theme' | 'faction' | 'object' | 'event';

export interface BaseEntity {
  id: string;
  projectId: string;
  name: string;
  type: EntityType;
  description?: string;
  createdAt: Date;
  modifiedAt: Date;
  analytics: EntityAnalytics;
}

export interface EntityAnalytics {
  entityId: string;
  entityName: string;
  entityType: EntityType;
  appearances: number;
  totalWordsInvolved: number;
  documentsAppeared: string[];
  relationshipCount: number;
}

export interface Character extends BaseEntity {
  age?: number;
  gender?: string;
  traits?: string[];
}

export interface Location extends BaseEntity {
  name: string;
  description?: string;
  childrenLocations?: Location[];
}

export interface PlotThread extends BaseEntity {
  conflict?: string;
  resolution?: string;
}

export interface Theme extends BaseEntity {
  exploration?: string;
  significance?: string;
}

export interface Faction extends BaseEntity {
  members?: string[];
  goals?: string[];
}

export interface Object extends BaseEntity {
  properties?: Record<string, any>;
}

export interface Event extends BaseEntity {
  date?: Date;
  participants?: string[];
}

export type WorldEntity = Character | Location | PlotThread | Theme | Faction | Object | Event;
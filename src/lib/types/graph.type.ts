import { EntityType, WorldEntity } from "./entity.types";
import { Relationship } from "./relationship.types";

export interface GraphNode {
  id: string;
  type: EntityType;
  name: string;
  x?: number;
  y?: number;
  size?: number;
  color?: string;
  data: WorldEntity;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  weight: number;
  data: Relationship;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

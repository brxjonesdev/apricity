import { call } from "@/shared/api/tauriClient";

import {
  GraphEdge,
  GraphEdgeCreateInput,
  GraphEdgeUpdateInput,
  GraphEdgeType,
  GraphNodeType,
  GraphTraversalResult,
} from "@/features/graph";

export function createGraphEdge(input: GraphEdgeCreateInput) {
  return call<GraphEdge>("create_graph_edge", { input });
}

export function updateGraphEdge(input: {
  edgeId: string;
  updates: GraphEdgeUpdateInput;
}) {
  return call<GraphEdge>("update_graph_edge", input);
}

export function deleteGraphEdge(edgeId: string) {
  return call<boolean>("delete_graph_edge", { edgeId });
}

export function getStoryGraph(storyId: string) {
  return call<GraphEdge[]>("get_story_graph", { storyId });
}

export function getEntityConnections(input: {
  storyId: string;
  nodeType: GraphNodeType;
  nodeId: string;
}) {
  return call<GraphEdge[]>("get_entity_connections", {
    input,
  });
}

export function getRelatedEntities(input: {
  storyId: string;
  nodeType: GraphNodeType;
  nodeId: string;
}) {
  return call<
    {
      nodeType: GraphNodeType;
      nodeId: string;
      edgeType: GraphEdgeType;
      edgeId: string;
      direction: "in" | "out";
    }[]
  >("get_related_entities", { input });
}

export function traverseGraph(input: {
  storyId: string;

  startNodeType: GraphNodeType;
  startNodeId: string;

  depth: number;
}) {
  return call<GraphTraversalResult[]>("traverse_graph", {
    input,
  });
}

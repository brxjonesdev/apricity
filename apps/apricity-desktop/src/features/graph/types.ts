export type GraphNodeType =
  | "character"
  | "event"
  | "location"
  | "group"
  | "scene"
  | "chapter"
  | "act"
  | "plot_point"
  | "note";

export type GraphEdgeType =
  | "knows"
  | "located_in"
  | "member_of"
  | "caused_by"
  | "mentions"
  | "belongs_to"
  | "precedes"
  | "leads_to"
  | "related_to"
  | "custom";

export type GraphEdge = {
  id: string;
  storyId: string;

  fromType: GraphNodeType;
  fromId: string;

  toType: GraphNodeType;
  toId: string;

  type: GraphEdgeType;

  label?: string;
  weight?: number;

  createdAt: string;
  updatedAt: string;
};

export type GraphEdgeCreateInput = {
  storyId: string;

  fromType: GraphNodeType;
  fromId: string;

  toType: GraphNodeType;
  toId: string;

  type: GraphEdgeType;

  label?: string;
  weight?: number;
};

export type GraphEdgeUpdateInput = {
  type?: GraphEdgeType;

  label?: string;
  weight?: number;

  fromType?: GraphNodeType;
  fromId?: string;

  toType?: GraphNodeType;
  toId?: string;
};

export type GraphTraversalStep = {
  edgeId: string;
  type: GraphEdgeType;
};

export type GraphTraversalResult = {
  nodeType: GraphNodeType;
  nodeId: string;

  depth: number;

  path: GraphTraversalStep[];
};

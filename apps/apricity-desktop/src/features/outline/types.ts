export type ActType =
  | "setup"
  | "rising_action"
  | "climax"
  | "falling_action"
  | "resolution";

export type Act = {
  id: string;
  storyId: string;
  title: string;
  type: ActType;
  order: number; // Act 1, Act 2, Act 3
  summary?: string;
  eventIds?: string[];
  startEventId?: string;
  endEventId?: string;
  createdAt: string;
  updatedAt: string;
};

export type PlotPointType =
  | "inciting_incident"
  | "plot_twist"
  | "midpoint"
  | "reveal"
  | "turning_point"
  | "climax_moment"
  | "low_point"
  | "other";

export type PlotPoint = {
  id: string;
  storyId: string;
  title: string;
  description?: string;
  type: PlotPointType;
  actId: string;
  order: number;

  eventId?: string;
  characterIds?: string[];
  locationIds?: string[];

  importance?: "low" | "medium" | "high" | "critical";

  createdAt: string;
  updatedAt: string;
};

export type ActCreateInput = Omit<Act, "id" | "createdAt" | "updatedAt">;

export type ActUpdateInput = Partial<
  Omit<Act, "id" | "storyId" | "createdAt" | "updatedAt">
>;

export type PlotPointCreateInput = Omit<
  PlotPoint,
  "id" | "createdAt" | "updatedAt"
>;

export type PlotPointUpdateInput = Partial<
  Omit<PlotPoint, "id" | "storyId" | "createdAt" | "updatedAt">
>;

export type ActWithPlotPoints = {
  act: Act;
  plotPoints: PlotPoint[];
};

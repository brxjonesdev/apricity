export type ActType =
  | "setup"
  | "rising_action"
  | "climax"
  | "falling_action"
  | "resolution";
export type ActDB = {
  id: string;
  storyId: string;
  title: string;
  type: ActType;
  order: number;
  createdAt: string;
  lastUpdatedAt: string;
  isArchived: boolean;
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
export type PlotPointDB = {
  id: string;
  storyId: string;
  actId: string;
  title: string;
  description: string | null;
  type: PlotPointType;
  otherDescription: string | null;
  order: number;
  importance?: "low" | "medium" | "high" | "critical";
  createdAt: string;
  updatedAt: string;
};

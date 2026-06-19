import { ActType, PlotPointType } from "./outline.db";
export type ActDTO = {
  id?: string;
  storyId?: string;
  description?: string;
  title: string;
  type: ActType;
  order?: number;
  isArchived: boolean;
};

export type PlotPointDTO = {
  id?: string;
  storyId?: string;
  actId?: string;
  title: string;
  description?: string;
  type: PlotPointType;
  otherDescription?: string | null;
  order?: number;
  importance?: "low" | "medium" | "high" | "critical";
};

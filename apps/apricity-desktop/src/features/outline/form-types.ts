import { ActType, PlotPointType } from "./outline.db";

export type ActForm = {
  title: string;
  description?: string;
  type: ActType;
  isArchived: boolean;
};

export type PlotPointForm = {
  title: string;
  description?: string;
  type: PlotPointType;
  otherDescription?: string | null;
  importance?: "low" | "medium" | "high" | "critical";
};

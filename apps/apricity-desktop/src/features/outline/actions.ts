import {
  Act,
  ActCreateInput,
  ActUpdateInput,
  PlotPoint,
  PlotPointCreateInput,
  PlotPointUpdateInput,
} from "@/features/outline";

import { call } from "@/shared/api/tauriClient";

// Get all acts for a story
export function getAllActs(storyId: string) {
  return call<Act[]>("get_all_acts", { storyId });
}

// Get act by ID
export function getActById(id: string) {
  return call<Act>("get_act_by_id", { id });
}

// Create act
export function createAct(input: ActCreateInput) {
  return call<Act>("create_act", { input });
}

// Update act
export function updateAct(id: string, updates: ActUpdateInput) {
  return call<Act>("update_act", { id, updates });
}

// Delete act
export function deleteAct(id: string) {
  return call<boolean>("delete_act", { id });
}

// Get all plot points for a story
export function getAllPlotPoints(storyId: string) {
  return call<PlotPoint[]>("get_all_plot_points", { storyId });
}

// Get plot point by ID
export function getPlotPointById(id: string) {
  return call<PlotPoint>("get_plot_point_by_id", { id });
}

// Create plot point
export function createPlotPoint(input: PlotPointCreateInput) {
  return call<PlotPoint>("create_plot_point", { input });
}

// Update plot point
export function updatePlotPoint(id: string, updates: PlotPointUpdateInput) {
  return call<PlotPoint>("update_plot_point", {
    id,
    updates,
  });
}

// Delete plot point
export function deletePlotPoint(id: string) {
  return call<boolean>("delete_plot_point", { id });
}

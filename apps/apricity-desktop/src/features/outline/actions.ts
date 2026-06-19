import {
  Act,
  ActCreateInput,
  ActUpdateInput,
  PlotPoint,
  PlotPointCreateInput,
  PlotPointUpdateInput,
} from "@/features/outline";

import { call } from "@/shared/lib/api/tauriClient";
import { USE_MOCKS } from "@/shared/config/env";
import { mockActs, mockPlotPoints } from "./mockdata";
import { success } from "@/shared/types";

export function getAllActs(storyId: string) {
  if (USE_MOCKS) {
    const acts = mockActs.filter((a) => a.storyId === storyId);
    return Promise.resolve(success(acts));
  }

  return call<Act[]>("get_all_acts", { storyId });
}

export function getActById(id: string) {
  if (USE_MOCKS) {
    const act = mockActs.find((a) => a.id === id);

    if (!act) {
      throw new Error("Act not found");
    }

    return Promise.resolve(success(act));
  }

  return call<Act>("get_act_by_id", { id });
}

export function createAct(input: ActCreateInput) {
  if (USE_MOCKS) {
    const newAct: Act = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockActs.push(newAct);

    return Promise.resolve(success(newAct));
  }

  return call<Act>("create_act", { input });
}

export function updateAct(id: string, updates: ActUpdateInput) {
  if (USE_MOCKS) {
    const act = mockActs.find((a) => a.id === id);

    if (!act) {
      throw new Error("Act not found");
    }

    Object.assign(act, updates, {
      updatedAt: new Date().toISOString(),
    });

    return Promise.resolve(success(act));
  }

  return call<Act>("update_act", { id, updates });
}

export function deleteAct(id: string) {
  if (USE_MOCKS) {
    const index = mockActs.findIndex((a) => a.id === id);

    if (index === -1) {
      throw new Error("Act not found");
    }

    mockActs.splice(index, 1);

    return Promise.resolve(success(true));
  }

  return call<boolean>("delete_act", { id });
}

export function getActPlotPoints(actId: string) {
  if (USE_MOCKS) {
    const plotPoints = mockPlotPoints.filter((p) => p.actId === actId);

    return Promise.resolve(success(plotPoints));
  }

  return call<PlotPoint[]>("get_all_plot_points", { actId });
}

export function getPlotPointById(id: string) {
  if (USE_MOCKS) {
    const plotPoint = mockPlotPoints.find((p) => p.id === id);

    if (!plotPoint) {
      throw new Error("Plot point not found");
    }

    return Promise.resolve(success(plotPoint));
  }

  return call<PlotPoint>("get_plot_point_by_id", { id });
}

export function createPlotPoint(input: PlotPointCreateInput) {
  if (USE_MOCKS) {
    const newPlotPoint: PlotPoint = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockPlotPoints.push(newPlotPoint);

    return Promise.resolve(success(newPlotPoint));
  }

  return call<PlotPoint>("create_plot_point", {
    input,
  });
}

export function updatePlotPoint(id: string, updates: PlotPointUpdateInput) {
  if (USE_MOCKS) {
    const plotPoint = mockPlotPoints.find((p) => p.id === id);

    if (!plotPoint) {
      throw new Error("Plot point not found");
    }

    Object.assign(plotPoint, updates, {
      updatedAt: new Date().toISOString(),
    });

    return Promise.resolve(success(plotPoint));
  }

  return call<PlotPoint>("update_plot_point", {
    id,
    updates,
  });
}

export function deletePlotPoint(id: string) {
  if (USE_MOCKS) {
    const index = mockPlotPoints.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new Error("Plot point not found");
    }

    mockPlotPoints.splice(index, 1);

    return Promise.resolve(success(true));
  }

  return call<boolean>("delete_plot_point", { id });
}

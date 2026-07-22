import { USE_MOCKS } from "@/shared/config/env";
import { call } from "@/shared/lib/api/tauriClient";
import { mockActs } from "../mockdata";

export async function reorderActs(storyId: string, orderedActIds: string[]): Promise<void>{

  if (USE_MOCKS) {

  }

  const res = await call<void>("reorder_acts", { story_id: storyId, new_order: orderedActIds });
  if (!res.ok) {
    throw new Error(res.error);
  }
  return;
}

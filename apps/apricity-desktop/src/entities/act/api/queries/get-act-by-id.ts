import { call } from "@/shared/lib/api/tauriClient";
import { Act } from "../../model/types";
import { ActDTO } from "../dto/act.dto";
import { actMapper } from "../mappers/act.mapper";
import { USE_MOCKS } from "@/shared/config/env";
import { mockActs } from "../mockdata";

export async function getActById(actID: string): Promise<Act>{

  if (USE_MOCKS) {
    const index = mockActs.findIndex((a) => a.id === actID)
    if (index < 0) {
      throw new Error("act not found")
    }
    return actMapper.mapAct(mockActs[index])
  }

  const res = await call<ActDTO>("get_act_by_id", { act_id: actID })
  if (!res.ok) {
    throw new Error(res.error)
  }
  return actMapper.mapAct(res.data)
}

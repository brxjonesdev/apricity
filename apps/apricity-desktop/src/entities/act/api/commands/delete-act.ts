import { USE_MOCKS } from '@/shared/config/env';
import { call } from '@/shared/lib/api/tauriClient';
import { mockActs } from '../mockdata';

export async function deleteAct(id: string): Promise<boolean> {
  if (USE_MOCKS) {
    const index = mockActs.findIndex((a) => a.id === id);
    if (index >= 0) {
      mockActs.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  const res = await call<boolean>('delete_act', { target_id: id });
  if (!res.ok) {
    throw new Error(res.error);
  }
  return res.data;
}

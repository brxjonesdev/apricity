import { call } from '@/shared/lib/api/tauriClient';
import { Act } from '../../model/types';
import { ActDTO } from '../dto/act.dto';
import { actMapper } from '../mappers/act.mapper';
import { USE_MOCKS } from '@/shared/config/env';
import { mockActs } from '../mockdata';
export async function updateAct(
  dto: Partial<ActDTO> & { id: string },
): Promise<Act> {
  if (USE_MOCKS) {
    const index = mockActs.findIndex((a) => a.id === dto.id);
    if (index === -1) {
      throw new Error('Act not found');
    }
    const updated = { ...mockActs[index], ...dto };
    mockActs[index] = updated;
    return actMapper.mapAct(updated);
  }

  const res = await call<ActDTO>('update_act', { updates: dto });
  if (!res.ok) {
    throw new Error(res.error);
  }
  return actMapper.mapAct(res.data);
}

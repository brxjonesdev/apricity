import { Act } from '../../model/types';
import { CreateActDTO } from '../dto/create-act.dto';
import { ActDTO } from '../dto/act.dto';
import { call } from '@/shared/lib/api/tauriClient';
import { actMapper } from '../mappers/act.mapper';
import { USE_MOCKS } from '@/shared/config/env';
import { mockActs } from '../mockdata';

export async function createAct(dto: CreateActDTO): Promise<Act> {
  if (USE_MOCKS) {
    const newAct: ActDTO = {
      ...dto,
    };
    mockActs.push(newAct);
    return actMapper.mapAct(newAct);
  }
  const res = await call<ActDTO>('create_act', { input: dto });
  if (!res.ok) {
    throw new Error(res.error);
  }
  return actMapper.mapAct(res.data);
}

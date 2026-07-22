import { call } from '@/shared/lib/api/tauriClient';
import { Act } from '../../model/types';
import { ActDTO } from '../dto/act.dto';
import { actMapper } from '../mappers/act.mapper';
import { USE_MOCKS } from '@/shared/config/env';
import { mockActs } from '../mockdata';
export async function getActsByStoryId(storyId: string): Promise<Act[]> {
  if (USE_MOCKS) {
    const acts = mockActs.filter((a) => a.story_id === storyId);
    return acts.map((a) => actMapper.mapAct(a));
  }

  const res = await call<ActDTO[]>('get_acts_by_story_id', {
    story_id: storyId,
  });
  if (!res.ok) {
    throw new Error(res.error);
  }
  return res.data.map((act) => actMapper.mapAct(act));
}

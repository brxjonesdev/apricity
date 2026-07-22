import { Series } from '../../model/series';
import { call } from '@/shared/lib/api/tauriClient';
import { USE_MOCKS } from '@/shared/config/env';
import { mockSeries } from '../../mockdata';
import { SeriesDTO } from '../dto/series.dto';
import { seriesMapper } from '../mappers/series.mapper';

export async function getAllSeries(): Promise<Series[]> {
  if (USE_MOCKS) {
    return mockSeries.map((s) => seriesMapper.mapSeries(s));
  }
  const res = await call<SeriesDTO[]>('get_series');
  if (!res.ok) {
    throw new Error(res.error);
  }
  return res.data.map((s) => seriesMapper.mapSeries(s));
}

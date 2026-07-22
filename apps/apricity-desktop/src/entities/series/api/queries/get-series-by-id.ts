import { Series } from '../../model/series';
import { call } from '@/shared/lib/api/tauriClient';
import { USE_MOCKS } from '@/shared/config/env';
import { mockSeries } from '../../mockdata';
import { SeriesDTO } from '../dto/series.dto';
import { seriesMapper } from '../mappers/series.mapper';

export async function getSeriesById(seriesId: string): Promise<Series> {
  if (USE_MOCKS) {
    const index = mockSeries.findIndex((s) => s.id == seriesId);
    if (index < 0) {
      throw new Error('Series not found');
    }
    return seriesMapper.mapSeries(mockSeries[index]);
  }
  const res = await call<SeriesDTO>('get_series');
  if (!res.ok) {
    throw new Error(res.error);
  }
  return seriesMapper.mapSeries(res.data);
}

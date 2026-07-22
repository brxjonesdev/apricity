import { call } from '@/shared/lib/api/tauriClient';
import { Series } from '../../model/series';
import { UpdateSeriesDTO, SeriesDTO } from '../dto/series.dto';
import { seriesMapper } from '../mappers/series.mapper';
import { USE_MOCKS } from '@/shared/config/env';
import { mockSeries } from '../../mockdata';

export async function updateSeries(
  updates: UpdateSeriesDTO,
  seriesId: string,
): Promise<Series> {
  if (USE_MOCKS) {
    const index = mockSeries.findIndex((s) => s.id == seriesId);
    if (index >= 0) {
      mockSeries[index] = { ...mockSeries[index], ...updates };
      return seriesMapper.mapSeries(mockSeries[index]);
    }
  }

  const res = await call<SeriesDTO>('update_series', {
    series_id: seriesId,
    updates: updates,
  });
  if (!res.ok) {
    throw new Error(res.error);
  }
  return seriesMapper.mapSeries(res.data);
}

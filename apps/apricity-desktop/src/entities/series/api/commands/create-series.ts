import { call } from '@/shared/lib/api/tauriClient';
import { Series } from '../../model/series';
import { CreateSeriesDTO, SeriesDTO } from '../dto/series.dto';
import { seriesMapper } from '../mappers/series.mapper';
import { USE_MOCKS } from '@/shared/config/env';
import { mockSeries } from '../../mockdata';

export async function createSeries(input: CreateSeriesDTO): Promise<Series> {
  if (USE_MOCKS) {
    const newSeries: SeriesDTO = {
      id: crypto.randomUUID(),
      title: input.title,
    };
    mockSeries.push(newSeries);
    return seriesMapper.mapSeries(newSeries);
  }

  const res = await call<SeriesDTO>('create_series', { new_series: input });
  if (!res.ok) {
    throw new Error(res.error);
  }
  return seriesMapper.mapSeries(res.data);
}

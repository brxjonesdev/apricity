import { Series } from '../../model/series';
import { SeriesDTO } from '../dto/series.dto';

export function mapSeries(dto: SeriesDTO): Series {
  return {
    seriesId: dto.id,
    title: dto.title,
    description: dto.description
  };
}

export const seriesMapper = {
  mapSeries,
};

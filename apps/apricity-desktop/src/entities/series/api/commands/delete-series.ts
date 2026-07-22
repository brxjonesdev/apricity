import { call } from '@/shared/lib/api/tauriClient';
import { USE_MOCKS } from '@/shared/config/env';
import { mockSeries } from '../../mockdata';
import { mockStories } from '@/entities/story/api/mockdata';

export async function deleteSeries(seriesId: string): Promise<boolean> {
  if (USE_MOCKS) {
    const seriesIndex = mockSeries.findIndex(
      (series) => series.id === seriesId,
    );

    if (seriesIndex === -1) {
      return false;
    }

    mockSeries.splice(seriesIndex, 1);

    mockStories.forEach((story) => {
      if (story.series_id === seriesId) {
        story.series_id = null;
      }
    });

    return true;
  }

  const res = await call<boolean>('deleteSeries', { seriesId });
  // series_id UUID REFERENCES series(id) ON DELETE SET NULL

  if (!res.ok) {
    throw new Error(res.error);
  }

  return res.data;
}

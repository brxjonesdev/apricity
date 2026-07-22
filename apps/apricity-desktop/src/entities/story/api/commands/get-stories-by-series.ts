import { call } from '@/shared/lib/api/tauriClient';
import { Story } from '../../types';
import { StoryDTO } from '../dto/story.dto';
import { storyMapper } from '../mappers/map-story';
import { USE_MOCKS } from '@/shared/config/env';
import { mockStories } from '../mockdata';

export async function getStoriesBySeriesId({
  seriesId,
}: {
  seriesId: string;
}): Promise<Story[]> {
  if (USE_MOCKS) {
    const stories = mockStories.filter((s) => s.series_id === seriesId);
    return stories.map((s) => storyMapper.mapBaseStory(s));
  }

  const res = await call<StoryDTO[]>('get_story_by_series', {
    series_id: seriesId,
  });
  if (!res.ok) {
    throw new Error(res.error);
  }
  return res.data.map((story) => storyMapper.mapBaseStory(story));
}

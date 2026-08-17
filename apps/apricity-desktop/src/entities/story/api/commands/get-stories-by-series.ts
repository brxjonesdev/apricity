import { call } from '@/shared/lib/api/tauriClient';
import { StoryInSeries } from '../../types';
import { StoryDTO } from '../dto/story.dto';
import { storyMapper } from '../mappers/map-story';
import { USE_MOCKS } from '@/shared/config/env';
import { mockStories } from '../mockdata';
import { StoryDetailDTO } from '../dto/story-detail.dto';

export async function getStoriesBySeriesId({
  seriesId,
}: {
  seriesId: string;
}): Promise<StoryInSeries[]> {
  console.log("getStoriesBySeriesId:", seriesId);

  if (USE_MOCKS) {
    const stories = mockStories.filter(
      (s) => s.series_id === seriesId && s.is_archived === false
    );

    console.log("mock stories:", stories);

    return stories.map((story) =>
      storyMapper.mapStoryInSeries(story)
    );
  }

  const res = await call<StoryDetailDTO[]>('get_story_by_series', {
    series_id: seriesId,
  });

  console.log("get_story_by_series response:", res);

  if (!res.ok) {
    console.error("get_story_by_series error:", res.error);
    throw new Error(res.error);
  }

  console.log("stories:", res.data);

  return res.data.map((story) => {
    console.log("mapping story:", story);
    return storyMapper.mapStoryInSeries(story);
  });
}
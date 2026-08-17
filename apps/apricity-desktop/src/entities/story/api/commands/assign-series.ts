import { USE_MOCKS } from '@/shared/config/env';
import { call } from '@/shared/lib/api/tauriClient';
import { StoryDetails } from '../../models/story-detail';
import { StoryDetailDTO } from '../dto/story-detail.dto';
import { storyMapper } from '../mappers/map-story';
import { mockStories } from '../mockdata';

// Assign story to a series

export async function assignStoryToSeries({
  storyId,
  seriesId,
  order
}: {
  storyId: string;
    seriesId: string;
    order: string;
}): Promise<StoryDetails> {
  if (USE_MOCKS) {
    const index = mockStories.findIndex((story) => story.id === storyId);
    if (index < 0) throw new Error(`Story not found: ${storyId}`);
    mockStories[index].series_id = seriesId;
    mockStories[index].order = order
    return storyMapper.mapDetailStory(mockStories[index]);
  }

  const res = await call<StoryDetailDTO>('assign_story_to_series', {
    storyId,
    seriesId,
  });

  if (!res.ok) throw new Error(res.error);
  return storyMapper.mapDetailStory(res.data);
}

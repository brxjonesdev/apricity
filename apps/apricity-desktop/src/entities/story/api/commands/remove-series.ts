import { USE_MOCKS } from '@/shared/config/env';
import { call } from '@/shared/lib/api/tauriClient';
import { StoryDetailDTO } from '../dto/story-detail.dto';
import { storyMapper } from '../mappers/map-story';
import { mockStories } from '../mockdata';
import { StoryDetails } from '../../models/story-detail';

export async function removeStoryFromSeries({
  storyId,
}: {
  storyId: string;
}): Promise<StoryDetails> {
  if (USE_MOCKS) {
    const index = mockStories.findIndex((story) => story.id === storyId);
    if (index < 0) throw new Error(`Story not found: ${storyId}`);
    mockStories[index].series_id = null;
    mockStories[index].order = null;
    return storyMapper.mapDetailStory(mockStories[index]);
  }

  const res = await call<StoryDetailDTO>('remove_story_from_series', {
    storyId,
  });
  if (!res.ok) throw new Error(res.error);
  return storyMapper.mapDetailStory(res.data);
}

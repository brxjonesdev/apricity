import { USE_MOCKS } from '@/shared/config/env';
import { call } from '@/shared/lib/api/tauriClient';
import { Story } from '../../types';
import { StoryDTO } from '../dto/story.dto';
import { storyMapper } from '../mappers/map-story';
import { mockStories } from '../mockdata';


export async function removeStoryFromSeries({
  storyId,
}: {
  storyId: string;
}): Promise<Story> {
  if (USE_MOCKS) {
    const index = mockStories.findIndex((story) => story.id === storyId);
    if (index < 0) throw new Error(`Story not found: ${storyId}`);
    mockStories[index].series_id = null;
    mockStories[index].order = null;
    return storyMapper.mapStory(mockStories[index]);
  }

  const res = await call<StoryDTO>('remove_story_from_series', {
    storyId,
  });
  if (!res.ok) throw new Error(res.error);
  return storyMapper.mapStory(res.data);
}

import { USE_MOCKS } from '@/shared/config/env';
import { call } from '@/shared/lib/api/tauriClient';
import { Story } from '../../types';
import { StoryDTO } from '../dto/story.dto';
import { storyMapper } from '../mappers/map-story';
import { mockStories } from '../mockdata';

export async function getStoryById(
  storyId: string,
): Promise<Story> {
  const res = USE_MOCKS
    ? { ok: true as const, data: mockStories.find((s) => s.id === storyId) }
    : await call<StoryDTO>('get_story_details', { id: storyId });

  if (!res.ok) {
    throw new Error(res.error);
  }

  if (!res.data) {
    throw new Error(`Story not found: ${storyId}`);
  }

  return storyMapper.mapStory(res.data);
}

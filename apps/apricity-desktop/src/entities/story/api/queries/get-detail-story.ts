import { USE_MOCKS } from '@/shared/config/env';
import { call } from '@/shared/lib/api/tauriClient';
import { StoryDetails } from '../../models/story-detail';
import { StoryDetailDTO } from '../dto/story-detail.dto';
import { storyMapper } from '../mappers/map-story';
import { mockStories } from '../mockdata';

// Get story details by id

export async function getStoryDetailsById(
  storyId: string,
): Promise<StoryDetails> {
  const res = USE_MOCKS
    ? { ok: true as const, data: mockStories.find((s) => s.id === storyId) }
    : await call<StoryDetailDTO>('get_story_details', { id: storyId });

  if (!res.ok) {
    throw new Error(res.error);
  }

  if (!res.data) {
    throw new Error(`Story not found: ${storyId}`);
  }

  return storyMapper.mapDetailStory(res.data);
}

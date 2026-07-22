import { USE_MOCKS } from '@/shared/config/env';
import { call } from '@/shared/lib/api/tauriClient';
import { StoryDetails } from '../../models/story-detail';
import { StoryDetailDTO } from '../dto/story-detail.dto';
import { UpdateStoryDTO } from '../dto/update-story.dto';
import { storyMapper } from '../mappers/map-story';
import { mockStories } from '../mockdata';

// Update existing story

export async function updateStory({
  update,
}: {
  update: UpdateStoryDTO;
}): Promise<StoryDetails> {
  if (USE_MOCKS) {
    const index = mockStories.findIndex((story) => story.id === update.id);
    if (index < 0) throw new Error(`Story not found: ${update.id}`);
    mockStories[index] = { ...mockStories[index], ...update };
    return storyMapper.mapDetailStory(mockStories[index]);
  }
  const res = await call<StoryDetailDTO>('update_story', { update });
  if (!res.ok) throw new Error(res.error);

  return storyMapper.mapDetailStory(res.data);
}

import { USE_MOCKS } from '@/shared/config/env';
import { call } from '@/shared/lib/api/tauriClient';
import { UpdateStoryDTO } from '../dto/update-story.dto';
import { storyMapper } from '../mappers/map-story';
import { mockStories } from '../mockdata';
import { Story } from '../../types';
import { StoryDTO } from '../dto/story.dto';

// Update existing story

export async function updateStory({
  update,
}: {
  update: UpdateStoryDTO;
}): Promise<Story> {
  if (USE_MOCKS) {
    const index = mockStories.findIndex((story) => story.id === update.id);
    if (index < 0) throw new Error(`Story not found: ${update.id}`);
    mockStories[index] = { ...mockStories[index], ...update };
    return storyMapper.mapStory(mockStories[index]);
  }
  const res = await call<StoryDTO>('update_story', { update });
  if (!res.ok) throw new Error(res.error);

  return storyMapper.mapStory(res.data);
}

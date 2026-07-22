import { USE_MOCKS } from '@/shared/config/env';
import { call } from '@/shared/lib/api/tauriClient';
import { mockStories } from '../mockdata';
import { Story } from '@/entities/story';
import { StoryDTO } from '../dto/story.dto';
import { storyMapper } from '../mappers/map-story';

export async function restoreStory({
  storyId,
}: {
  storyId: string;
}): Promise<Story> {
  if (USE_MOCKS) {
    const index = mockStories.findIndex((s) => s.id === storyId);
    if (index !== -1) {
      mockStories[index].is_archived = false;
      return storyMapper.mapBaseStory(mockStories[index]);
    }
  }

  const res = await call<StoryDTO>('restore_story', { storyId });
  if (!res.ok) {
    throw new Error(res.error);
  }

  return storyMapper.mapBaseStory(res.data);
}

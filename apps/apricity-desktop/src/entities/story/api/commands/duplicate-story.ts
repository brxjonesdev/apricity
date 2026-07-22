import { USE_MOCKS } from '@/shared/config/env';
import { call } from '@/shared/lib/api/tauriClient';
import { mockStories } from '../mockdata';
import { StoryDetailDTO } from '../dto/story-detail.dto';
import { StoryDetails } from '@/entities/story';
import { storyMapper } from '../mappers/map-story';

// TODO: should i pass in order value here?
export async function duplicateStory({
  storyId,
  index,
}: {
  storyId: string;
  index: number;
}): Promise<StoryDetails> {
  if (USE_MOCKS) {
    const storyIndex = mockStories.findIndex((s) => s.id === storyId);

    if (storyIndex === -1) {
      throw new Error('Story not found');
    }

    const duplicateStory: StoryDetailDTO = {
      ...mockStories[storyIndex],
      id: crypto.randomUUID(),
      title: `${mockStories[storyIndex].title} (Copy)`,
      order: index,
    };

    mockStories.splice(index, 0, duplicateStory);

    return storyMapper.mapDetailStory(duplicateStory);
  }

  const res = await call<StoryDetailDTO>('duplicate_story', {
    storyId,
    index,
  });

  if (!res.ok) {
    throw new Error(res.error);
  }

  return storyMapper.mapDetailStory(res.data);
}

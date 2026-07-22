import { USE_MOCKS } from '@/shared/config/env';
import { call } from '@/shared/lib/api/tauriClient';
import { StoryDetails } from '../../models/story-detail';
import { CreateStoryDTO } from '../dto/create-story.dto';
import { StoryDetailDTO } from '../dto/story-detail.dto';
import { storyMapper } from '../mappers/map-story';
import { mockStories } from '../mockdata';

// Create and add a new story

export async function createStory(
  input: CreateStoryDTO,
): Promise<StoryDetails> {
  if (USE_MOCKS) {
    // Create a mock DTO based on input data
    const newStoryDTO: StoryDetailDTO = {
      id: crypto.randomUUID(),
      order: input.order,
      series_id: input.seriesId || null,
      user_id: input.userId || null,
      title: input.title,
      synopsis: input.synopsis || '',
      cover_image: input.coverImage || null,
      genre: input.genre || null,
      status: 0,
      sync_status: 0,
      is_archived: false,
      last_updated: new Date().toISOString(),
      created_at: new Date().toISOString(),
      deleted_at: null,
    };
    mockStories.push(newStoryDTO);
    return storyMapper.mapDetailStory(newStoryDTO);
  }

  const res = await call<StoryDetailDTO>('create_story', { input });

  if (!res.ok) throw new Error(res.error);

  return storyMapper.mapDetailStory(res.data);
}

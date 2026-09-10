import { USE_MOCKS } from '@/shared/config/env';
import { call } from '@/shared/lib/api/tauriClient';
import { CreateStoryDTO } from '../dto/create-story.dto';
import { storyMapper } from '../mappers/map-story';
import { mockStories } from '../mockdata';
import { Story } from '../../types';
import { StoryDTO } from '../dto/story.dto';

// Create and add a new story

export async function createStory(
  input: CreateStoryDTO,
): Promise<Story> {
  if (USE_MOCKS) {
    // Create a mock DTO based on input data
    const newStoryDTO: StoryDTO = {
      id: crypto.randomUUID(),
      series_id: input.seriesId || null,
      title: input.title,
      order: null,
      synopsis: input.synopsis || "",
      cover_image: input.coverImage || null,
      genre: input.genre || [],
      status: "draft",
      is_archived: false,
      last_updated: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };
    mockStories.push(newStoryDTO);
    return storyMapper.mapStory(newStoryDTO);
  }

  const res = await call<StoryDTO>('create_story', { input });

  if (!res.ok) throw new Error(res.error);

  return storyMapper.mapStory(res.data);
}

import { call } from '@/shared/lib/api/tauriClient';
import { Story } from '../../types';
import { StoryDTO } from '../dto/story.dto';
import { storyMapper } from '../mappers/map-story';
import { USE_MOCKS } from '@/shared/config/env';
import { mockStories } from '../mockdata';
export async function getStories(): Promise<Story[]> {

  if (USE_MOCKS) {
    return mockStories.map((story)=> storyMapper.mapBaseStory(story))
  }
  const res = await call<StoryDTO[]>('get_stories');
  if (!res.ok) {
    throw new Error(res.error);
  }
  return res.data.map((s) => storyMapper.mapBaseStory(s));
}

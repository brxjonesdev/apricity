import { Story } from '@/entities/story';
import { StoryDTO } from '../dto/story.dto';
import { call } from '@/shared/lib/api/tauriClient';
import { storyMapper } from '../mappers/map-story';
import { USE_MOCKS } from '@/shared/config/env';
import { mockStories } from '../mockdata';



export async function getLastOpenedStory(): Promise<string>{
  if (USE_MOCKS) {
    const stories = mockStories.map((story) =>
      storyMapper.mapBaseStory(story)
    );
  
    const lastUpdated = stories.reduce((latest, story) =>
      new Date(story.lastUpdated) > new Date(latest.lastUpdated)
        ? story
        : latest
    );
  
    return lastUpdated.storyId;
  }

  
  const res = await call<StoryDTO>("get_last_opened_story");
  if (!res.ok) {
    throw new Error(res.error)
  }

  return res.data.id
}
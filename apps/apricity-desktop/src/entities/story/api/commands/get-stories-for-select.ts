import { StorySelection } from '../../models/story-selection';
import { StorySelectionDTO } from '../dto/story-selection.dto';
import { call } from '@/shared/lib/api/tauriClient';
import { storyMapper } from '../mappers/map-story';

export async function getStoriesForSelection(): Promise<StorySelection> {
  const res = await call<StorySelectionDTO>('get_stories_for_selection');

  if (!res.ok) {
    throw new Error(res.error);
  }

  return storyMapper.mapStorySelection(res.data);
}

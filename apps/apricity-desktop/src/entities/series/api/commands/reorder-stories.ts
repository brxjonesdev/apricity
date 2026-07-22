import { mockStories } from '@/entities/story/api/mockdata';
import { USE_MOCKS } from '@/shared/config/env';
import { call } from '@/shared/lib/api/tauriClient';

export async function reorderStoriesInSeries(
  seriesId: string,
  storyIds: string[],
): Promise<void> {
  if (USE_MOCKS) {
    storyIds.forEach((storyId, index) => {
      const story = mockStories.find(
        (story) => story.id === storyId && story.series_id === seriesId,
      );
      if (story) {
        story.order = index;
      }
    });
    return;
  }
  const res = await call<void>('reorder_stories', {
    series_id: seriesId,
    new_order: storyIds,
  });

  if (!res.ok) {
    throw new Error(res.error);
  }
}

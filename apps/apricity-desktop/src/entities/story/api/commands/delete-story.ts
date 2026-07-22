import { USE_MOCKS } from '@/shared/config/env';
import { call } from '@/shared/lib/api/tauriClient';
import { mockStories } from '../mockdata';

// Delete story and all contents

export async function deleteStory({
  storyId,
}: {
  storyId: string;
}): Promise<boolean> {
  if (USE_MOCKS) {
    const index = mockStories.findIndex((s) => s.id === storyId);
    if (index < 0) throw new Error(`Story not found: ${storyId}`);
    mockStories.splice(index, 1);
    return true;
  }
  const res = await call<boolean>('delete_story', { storyId });
  if (!res.ok) throw new Error(res.error);

  return res.data;
}

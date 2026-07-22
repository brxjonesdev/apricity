import { Chapter } from '../../model/chapter.model';
import { call } from '@/shared/lib/api/tauriClient';
import { ChapterDTO } from '../dto/chapter.dto';
import { chapterMapper } from '../mappers/chapter.mapper';
import { USE_MOCKS } from '@/shared/config/env';
import { mockChapters } from '../../mockdata';

export async function reorderChapter(
  storyId: string,
  chapterIds: string[],
): Promise<Chapter[]> {
  if (USE_MOCKS) {
    chapterIds.forEach((chapterId, index) => {
      const chapter = mockChapters.find((chapter) => chapter.id == chapterId);
      if (chapter) {
        chapter.order = index;
      }
    });
    return mockChapters.map((chapter) => chapterMapper.mapChapter(chapter));
  }

  const res = await call<ChapterDTO[]>('reorder_chapters', {
    story_id: storyId,
    new_order: chapterIds,
  });
  if (!res.ok) {
    throw new Error(res.error);
  }
  return res.data.map((chapter) => chapterMapper.mapChapter(chapter));
}

import { call } from '@/shared/lib/api/tauriClient';
import { ChapterDTO } from '../dto/chapter.dto';
import { USE_MOCKS } from '@/shared/config/env';
import { mockChapters } from '../../mockdata';

export async function duplicateChapter(
  chapterId: string,
  index: number,
): Promise<void> {
  if (USE_MOCKS) {
    const chapterIndex = mockChapters.findIndex(
      (chapter) => chapter.id === chapterId,
    );

    if (chapterIndex === -1) {
      throw new Error('Chapter not found');
    }

    const duplicatedChapter: ChapterDTO = {
      ...structuredClone(mockChapters[chapterIndex]),
      id: crypto.randomUUID(),
      order: index,
    };

    mockChapters.splice(index, 0, duplicatedChapter);

    mockChapters.forEach((chapter, i) => {
      chapter.order = i;
    });

    return;
  }

  const res = await call<void>('duplicate_chapter', {
    chapterId,
    index,
  });

  if (!res.ok) {
    throw new Error(res.error);
  }
}

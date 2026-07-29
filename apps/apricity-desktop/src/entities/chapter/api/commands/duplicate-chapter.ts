import { call } from '@/shared/lib/api/tauriClient';
import { ChapterDTO } from '../dto/chapter.dto';
import { USE_MOCKS } from '@/shared/config/env';
import { mockChapters } from '../mockdata';
import { Chapter } from '../../model/chapter.model';
import { chapterMapper } from '../mappers/chapter.mapper';

export async function duplicateChapter(
  chapterId: string,
  index: number,
): Promise<Chapter> {
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
    
    return chapterMapper.mapChapter(duplicatedChapter);
  }

  const res = await call<ChapterDTO>('duplicate_chapter', {
    chapterId,
    index,
  });

  if (!res.ok) {
    throw new Error(res.error);
  }

  return chapterMapper.mapChapter(res.data);
}

import { call } from '@/shared/lib/api/tauriClient';
import { Chapter } from '../../model/chapter.model';
import { ChapterDTO } from '../dto/chapter.dto';
import { chapterMapper } from '../mappers/chapter.mapper';
import { USE_MOCKS } from '@/shared/config/env';
import { mockChapters } from '../mockdata';

export async function getChapterById(chapterId: string): Promise<Chapter> {
  if (USE_MOCKS) {
    const index = mockChapters.findIndex((c) => c.id === chapterId);
    return chapterMapper.mapChapter(mockChapters[index]);
  }

  const res = await call<ChapterDTO>('get_chapter_by_id', {
    chapter_id: chapterId,
  });
  if (!res.ok) {
    throw new Error(res.error);
  }

  return chapterMapper.mapChapter(res.data);
}

import { call } from '@/shared/lib/api/tauriClient';
import { UpdateChapterDTO } from '../dto/update-chapter.dto';
import { ChapterDTO } from '../dto/chapter.dto';
import { Chapter } from '../../model/chapter.model';
import { chapterMapper } from '../mappers/chapter.mapper';
import { USE_MOCKS } from '@/shared/config/env';
import { mockChapters } from '../../mockdata';

export async function updateChapter(
  updates: UpdateChapterDTO,
): Promise<Chapter> {
  if (USE_MOCKS) {
    const chapterIndex = mockChapters.findIndex(
      (chapter) => chapter.id === updates.id,
    );

    if (chapterIndex === -1) {
      throw new Error('Chapter not found');
    }

    const updatedChapter = {
      ...mockChapters[chapterIndex],
      ...updates,
    };

    mockChapters[chapterIndex] = updatedChapter;

    return chapterMapper.mapChapter(updatedChapter);
  }

  const res = await call<ChapterDTO>('update_chapter', { 
    updates 
  });

  if (!res.ok) {
    throw new Error(res.error);
  }

  return chapterMapper.mapChapter(res.data);
}
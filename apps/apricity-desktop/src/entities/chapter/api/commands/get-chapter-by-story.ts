import { call } from '@/shared/lib/api/tauriClient';
import { ChapterDTO } from '../dto/chapter.dto';
import { Chapter } from '../../model/chapter.model';
import { chapterMapper } from '../mappers/chapter.mapper';
import { USE_MOCKS } from '@/shared/config/env';
import { mockChapters } from '../mockdata';
import { delay } from '@/shared/utils';

export async function getChaptersByStoryId(
  storyId: string,
): Promise<Chapter[]> {
  if (USE_MOCKS) {
    await delay(1200)
    const chapters = mockChapters.filter((chp) => chp.story_id == storyId);
    return chapters.map((chapter) => chapterMapper.mapChapter(chapter));
  }
  const res = await call<ChapterDTO[]>('get_chapters_by_story', {
    story_id: storyId,
  });
  if (!res.ok) {
    throw new Error(res.error);
  }
  return res.data.map((chapter) => chapterMapper.mapChapter(chapter));
}

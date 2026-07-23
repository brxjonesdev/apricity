import { call } from '@/shared/lib/api/tauriClient';
import { Chapter } from '../../model/chapter.model';
import { CreateChapterDTO } from '../dto/create-chapter.dto';
import { ChapterDTO } from '../dto/chapter.dto';
import { chapterMapper } from '../mappers/chapter.mapper';
import { USE_MOCKS } from '@/shared/config/env';
import { mockChapters } from '../../mockdata';

export async function createChapter(input: CreateChapterDTO): Promise<Chapter> {
  if (USE_MOCKS) {
    const new_chapter: ChapterDTO = {
      id: crypto.randomUUID(),
      ...input,
    };
    mockChapters.push(new_chapter);
    return chapterMapper.mapChapter(new_chapter);
  }

  const res = await call<ChapterDTO>('create_chapter', { new_chapter_data: input });
  if (!res.ok) {
    throw Error(res.error);
  }

  return chapterMapper.mapChapter(res.data);
}

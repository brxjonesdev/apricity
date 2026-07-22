import { Chapter } from '../../model/chapter.model';
import { ChapterDTO } from '../dto/chapter.dto';

const STATUS_MAP: Record<number, 'draft' | 'in-progress' | 'complete'> = {
  0: 'draft',
  1: 'in-progress',
  2: 'complete',
};

function mapStatus(status: number) {
  const mapped = STATUS_MAP[status];
  if (!mapped) throw new Error(`Invalid chapter status ${status}`);
  return mapped;
}

function mapChapter(dto: ChapterDTO): Chapter {
  return {
    id: dto.id,
    storyId: dto.story_id,
    title: dto.title,
    order: dto.order,
    synopsis: dto.synopsis,
    status: mapStatus(dto.status),
    createdAt: new Date(dto.created_at),
    lastUpdated: new Date(dto.last_updated),
  };
}

export const chapterMapper = {
  mapChapter,
};

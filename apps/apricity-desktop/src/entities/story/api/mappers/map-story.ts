import { Story, StoryStatus, StoryInSeries } from '../../models/story';
import { StoryDetails } from '../../models/story-detail';
import { StoryDTO } from '../dto/story.dto';
import { StoryDetailDTO } from '../dto/story-detail.dto';
import { StorySelection } from '../../models/story-selection';
import { StorySelectionDTO } from '../dto/story-selection.dto';

const STATUS_MAP: Record<number, StoryStatus> = {
  0: 'draft',
  1: 'in-progress',
  2: 'complete',
  3: 'archived',
};

function dbStatusToStoryStatus(status: number) {
  const mapped = STATUS_MAP[status];
  if (!mapped) {
    throw new Error(`Unknown story status from DB: ${status}`);
  }
  return mapped;
}

function mapBaseStory(dto: StoryDTO | StoryDetailDTO): Story {
  return {
    storyId: dto.id,
    order: null,
    seriesId: dto.series_id,
    title: dto.title,
    synopsis: dto.synopsis ?? '',
    coverImage: dto.cover_image,
    isArchived: dto.is_archived,
    lastUpdated: new Date(dto.last_updated),
  };
}

export const mapDetailStory = (dto: StoryDetailDTO): StoryDetails => ({
  ...mapBaseStory(dto),
  seriesId: dto.series_id,
  order: null,
  genre: dto.genre ?? [],
  status: dbStatusToStoryStatus(dto.status),
  createdAt: new Date(dto.created_at),
});

export function convertDetailedToThin(storyDetail: StoryDetailDTO): StoryDTO {
  return {
    id: storyDetail.id,
    is_archived: storyDetail.is_archived,
    order: null,
    series_id: storyDetail.series_id,
    title: storyDetail.title,
    synopsis: storyDetail.synopsis || '',
    cover_image: storyDetail.cover_image,
    last_updated: storyDetail.last_updated,
    created_at: storyDetail.created_at,
  };
}

export function mapStorySelection(dto: StorySelectionDTO): StorySelection {
  return {
    standalone: dto.standalone.map(mapBaseStory),
    series: dto.series.map((series) => ({
      id: series.id,
      title: series.title,
      stories: series.stories.map(mapBaseStory),
    })),
  };
}

function mapStoryInSeries(dto: StoryDetailDTO): StoryInSeries {
  if (dto.order == null) {
     throw new Error(`Story ${dto.id} is missing an order`);
   }
  return {
    storyId: dto.id,
    seriesId: dto.series_id,
    order: dto.order,
    title: dto.title,
    synopsis: dto.synopsis ?? '',
    coverImage: dto.cover_image,
    lastUpdated: new Date(dto.last_updated),
    isArchived: dto.is_archived,
  };
}

export const storyMapper = {
  mapBaseStory,
  mapDetailStory,
  convertDetailedToThin,
  mapStorySelection,
  mapStoryInSeries,
};

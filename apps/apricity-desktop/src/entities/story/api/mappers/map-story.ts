import { Story,StoryInSeries } from '../../models/story';
import { StoryDTO } from '../dto/story.dto';
import { StorySelection } from '../../models/story-selection';
import { StorySelectionDTO } from '../dto/story-selection.dto';

function mapStory(dto: StoryDTO): Story {
  return {
    storyId: dto.id,
    order: null,
    seriesId: dto.series_id,
    title: dto.title,
    synopsis: dto.synopsis ?? '',
    coverImage: dto.cover_image,
    isArchived: dto.is_archived,
    lastUpdated: new Date(dto.last_updated),
    status: dto.status,
    createdAt: new Date(dto.created_at)
  };
}

export function mapStorySelection(dto: StorySelectionDTO): StorySelection {
  return {
    standalone: dto.standalone.map(mapStory),
    series: dto.series.map((series) => ({
      id: series.id,
      title: series.title,
      stories: series.stories.map(mapStory),
    })),
  };
}

function mapStoryInSeries(dto: StoryDTO): StoryInSeries {
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
    status: dto.status,
    createdAt: new Date(dto.created_at)
  };
}

const mapStoryToStoryInSeries = (story: Story): StoryInSeries => ({
  storyId: story.storyId,
  seriesId: story.seriesId!,
  title: story.title,
  order: story.order ?? "",
  synopsis: story.synopsis,
  coverImage: story.coverImage,
  lastUpdated: story.lastUpdated,
  isArchived: story.isArchived,
  status: story.status,
  createdAt: story.createdAt,
});

export const storyMapper = {
  mapStory,
  mapStorySelection,
  mapStoryInSeries,
  mapStoryToStoryInSeries
};

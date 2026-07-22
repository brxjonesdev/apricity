import { StoryDTO } from './story.dto';
export type StorySelectionDTO = {
  standalone: StoryDTO[];
  series: {
    id: string;
    title: string;
    stories: StoryDTO[];
  }[];
};

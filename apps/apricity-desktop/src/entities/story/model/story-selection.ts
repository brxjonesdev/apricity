import { Story } from './story';

export type StorySelection = {
  standalone: Story[];
  series: {
    id: string;
    title: string;
    stories: Story[];
  }[];
};

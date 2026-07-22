import { StoryCard } from './story-card';
import { Story } from '@/entities/story';

export const StoryList = ({ stories }: { stories: Story[] }) => {
  // TODO: check if this is the right place to sort
  stories.sort((a, b) => a.order - b.order);
  return (
    <section>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {stories
          .filter((story) => story.isArchived === false)
          .map((story) => (
            <StoryCard key={story.storyId} story={story} />
          ))}
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {stories
          .filter((story) => story.isArchived === true)
          .map((story) => (
            <StoryCard key={story.storyId} story={story} />
          ))}
      </div>
    </section>
  );
};

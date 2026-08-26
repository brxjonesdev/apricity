import { cn } from '@/lib/utils';
import { Story } from '@/entities/story/types';
import { StorySelectItem } from './StorySelectItem';
import { useDroppable } from '@dnd-kit/react';


type Props = {
  id: string;
  stories: Story[];
  activeStoryId?: string;
  view: "grid" | "list";
  onSetActive: (storyId: string) => void;
};

export function UnassignedStoriesSection({
  stories,
  id,
  activeStoryId,
  view,
  onSetActive,
}: Props) {
  if (stories.length === 0) {
    return null;
  }
  const {ref, isDropTarget} = useDroppable({
     id,
   });

  return (
    <section>
      <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
        Your Stories
      </h3>

      <ul
        ref={ref}
        className={cn(
          isDropTarget && 'outline outline-primary outline-offset-4 bg-primary/5',
          view === "grid"
            ? "grid grid-cols-1 gap-3 sm:grid-cols-2"
            : "flex flex-col gap-2",
        )}
      >
        {stories.map((story) => (
          <li key={story.storyId}>
            <StorySelectItem
              story={story}
              isActive={story.storyId === activeStoryId}
              view={view}
              onSetActive={() => onSetActive(story.storyId)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
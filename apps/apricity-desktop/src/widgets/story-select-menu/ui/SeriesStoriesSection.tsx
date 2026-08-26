import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogTrigger,
} from "@/shared/components/shadcn/dialog"
import { Button } from '@/shared/components/shadcn/button';
import { StoryInSeries } from '@/entities/story/types';
import SeriesMenu from './SeriesMenu';
import { StorySelectItem } from './StorySelectItem';
import { useDroppable } from '@dnd-kit/react';
type Props = {
  id: string;
  seriesId: string;
  title: string;
  description?: string;
  stories: StoryInSeries[];
  activeStoryId?: string;
  view: "grid" | "list";
  menuOpen: boolean;
  onMenuOpenChange: (open: boolean) => void;
  onSetActive: (storyId: string) => void;
};

export function SeriesStoriesSection({
  id,
  seriesId,
  title,
  description,
  stories,
  activeStoryId,
  view,
  menuOpen,
  onMenuOpenChange,
  onSetActive,
}: Props) {
  const {ref ,isDropTarget} = useDroppable({id});
  return (
    <section className="flex flex-col gap-2" ref={ref}>
      <div className="flex items-center justify-between border-b pb-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          {title}
        </h3>

        <Dialog open={menuOpen} onOpenChange={onMenuOpenChange}>
          <DialogTrigger asChild>
            <Button variant="ghost">
              Edit Series
            </Button>
          </DialogTrigger>

          <SeriesMenu
            title={title}
            desc={description || ""}
            id={seriesId}
            onSuccess={() => onMenuOpenChange(false)}
          />
        </Dialog>
      </div>

      <ul
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
// widgets/story-select-menu/ui/StorySelectItem.tsx
import type { Story } from '@/entities/story';
import { Button } from '@/shared/components/shadcn/button';
import { ContextMenu, ContextMenuTrigger, ContextMenuContent } from '@/shared/components/shadcn/context-menu';
import { cn } from '@/lib/utils';
import { formatDate } from '@/shared/utils';
import { StoryContextMenu } from './SelectItemContextMenu';

type StorySelectItemProps = {
  story: Story;
  isActive: boolean;
  view: 'grid' | 'list';
  onSetActive: () => void;
};

export function StorySelectItem({ story, isActive, view, onSetActive }: StorySelectItemProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className={cn(
            'flex h-full gap-3 rounded-lg border p-2 transition-colors',
            isActive ? 'border-primary bg-muted' : 'hover:bg-muted/50',
            view === 'grid' ? 'flex-row' : 'flex-row items-center',
          )}
          onClick={()=> onSetActive()}
        >
          {view === 'grid' && story.coverImage && (
            <img
              src={story.coverImage}
              alt={story.title}
              className="h-24 w-16 self-center rounded-md object-cover shadow-sm"
            />
          )}

          <div className='min-w-0 flex-1 flex flex-col'>
            <h3 className='truncate font-medium text-foreground'>{story.title}</h3>

            {view === 'grid' && story.synopsis && (
              <p className='mt-1 line-clamp-2 text-sm text-muted-foreground  flex-1'>
                {story.synopsis}
              </p>
            )}

            <p className='mt-1 text-xs text-muted-foreground'>
              Updated {formatDate(story.lastUpdated)}
            </p>
          </div>
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent>
        <StoryContextMenu story={story} />
      </ContextMenuContent>
    </ContextMenu>
  );
}
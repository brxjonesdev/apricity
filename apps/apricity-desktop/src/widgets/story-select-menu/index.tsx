import { useMemo, useState } from 'react';
import { useActiveStory } from '@/app/layouts/contexts/active-story.context';
import type { Story } from '@/entities/story';
import { Card } from '@/shared/components/shadcn/card';
import { cn } from '@/lib/utils';
import { useFilteredStories } from './model/useFilteredStories';
import { StorySelectItem } from './ui/StorySelectItem';
import SelectToolbar from './ui/ToolBar';
import { Series } from '@/entities/series';
import { Separator } from '@/shared/components/shadcn/separator';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/shared/components/shadcn/context-menu';

export default function SelectMenu({ stories, series }: { stories: Story[]; series: Series[] }) {
  const { activeStoryId, setActiveStoryId } = useActiveStory();
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<'lastUpdated' | 'alphabetical'>('lastUpdated');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showArchived, setShowArchived] = useState(false)

  const visibleStories = useFilteredStories(stories, query, sortKey);

  const storiesBySeries = useMemo(() => {
    const displayedStories = visibleStories.filter(
      (story) => story.isArchived === showArchived
    );
  
    const grouped = series
      .map((currentSeries) => ({
        ...currentSeries,
        stories: displayedStories.filter(
          (story) => story.seriesId === currentSeries.seriesId
        ),
      }))
      .filter((currentSeries) => currentSeries.stories.length > 0);
  
    const unassignedStories = displayedStories.filter(
      (story) => !story.seriesId
    );
  
    return {
      grouped,
      unassignedStories,
    };
  }, [series, visibleStories, showArchived]);

  const empty =
    storiesBySeries.grouped.every((s) => s.stories.length === 0) &&
    storiesBySeries.unassignedStories.length === 0 

  return (
    <Card className="w-full max-h-96 min-h-96 gap-0 overflow-hidden py-0 shadow">
      <SelectToolbar
        query={query}
        setQuery={setQuery}
        sortKey={sortKey}
        setSortKey={setSortKey}
        view={view}
        setView={setView}
        isArchived={showArchived}
        setShowArchived={setShowArchived}
        
      />
      <Separator/>

      <div className='max-h-96 overflow-y-auto p-4'>
        {empty ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            {query
              ? `No stories match "${query}".`
              : showArchived
                ? "No archived stories."
                : "No stories to display."}
          </p>
        ) : (
          <div className='flex flex-col gap-6'>
            {storiesBySeries.unassignedStories.length > 0 && (
              <section>
                <h3 className='mb-3 text-sm font-semibold text-muted-foreground'>
                  Your Stories
                </h3>

                <ul
                  className={cn(
                    view === 'grid'
                      ? 'grid grid-cols-1 gap-3 sm:grid-cols-2'
                      : 'flex flex-col gap-2',
                  )}
                >
                  {storiesBySeries.unassignedStories.map((story) => (
                    <li key={story.storyId}>
                      <StorySelectItem
                        story={story}
                        isActive={story.storyId === activeStoryId}
                        view={view}
                        onSetActive={() => setActiveStoryId(story.storyId)}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {storiesBySeries.grouped.map((currentSeries) => (
              <section key={currentSeries.seriesId}>
                <ContextMenu>
                  <ContextMenuTrigger>
                    <h3 className="mb-3 text-sm font-semibold text-muted-foreground hover:underline">
                      {currentSeries.title}
                    </h3>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem>
                      Rename "{currentSeries.title}"?
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
            
                <ul
                  className={cn(
                    view === "grid"
                      ? "grid grid-cols-1 gap-3 sm:grid-cols-2"
                      : "flex flex-col gap-2"
                  )}
                >
                  {currentSeries.stories.map((story) => (
                    <li key={story.storyId}>
                      <StorySelectItem
                        story={story}
                        isActive={story.storyId === activeStoryId}
                        view={view}
                        onSetActive={() => setActiveStoryId(story.storyId)}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            ))}

          </div>
        )}
      </div>
    </Card>
  );
}
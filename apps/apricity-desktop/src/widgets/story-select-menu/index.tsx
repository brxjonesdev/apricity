import { useMemo, useState } from 'react';
import { useActiveStory } from '@/app/layouts/contexts/active-story.context';
import { useUpdateStoryMutation, type Story } from '@/entities/story';
import { Card } from '@/shared/components/shadcn/card';
import { useFilteredStories } from './model/useFilteredStories';
import SelectToolbar from './ui/ToolBar';
import { Series } from '@/entities/series';
import { Separator } from '@/shared/components/shadcn/separator';
import { UnassignedStoriesSection } from './ui/UnassignedStoriesSection';
import { storyMapper } from '@/entities/story/api/mappers/map-story';
import { SeriesStoriesSection } from './ui/SeriesStoriesSection';
import { StorySelectItem } from './ui/StorySelectItem';
import { DragDropProvider, DragOverlay } from '@dnd-kit/react';

export default function SelectMenu({ stories, series }: { stories: Story[]; series: Series[] }) {
  const { activeStoryId, setActiveStoryId } = useActiveStory();
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<'lastUpdated' | 'alphabetical'>('lastUpdated');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showArchived, setShowArchived] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [draggedStoryId, setDraggedStoryId] = useState<string | null>(null);
  const updateStory = useUpdateStoryMutation();

  const visibleStories = useFilteredStories(stories, query, sortKey);

  const storiesBySeries = useMemo(() => {
    const displayedStories = visibleStories.filter(
      (story) => story.isArchived === showArchived
    );

    const grouped = series
      .map((currentSeries) => ({
        ...currentSeries,
        stories: displayedStories
          .filter((story) => story.seriesId === currentSeries.seriesId)
          .map(storyMapper.mapStoryToStoryInSeries)
          .sort((a, b) => a.order.localeCompare(b.order)),
      }))
      .filter((currentSeries) => currentSeries.stories.length > 0);

    const unassignedStories = displayedStories.filter((story) => !story.seriesId);

    return {
      grouped,
      unassignedStories,
    };
  }, [series, visibleStories, showArchived]);

  const draggedStory = useMemo(() => {
    if (!draggedStoryId) return null;

    return (
      storiesBySeries.unassignedStories.find((s) => s.storyId === draggedStoryId) ??
      storiesBySeries.grouped
        .flatMap((s) => s.stories)
        .find((s) => s.storyId === draggedStoryId) ??
      null
    );
  }, [draggedStoryId, storiesBySeries]);

  const empty =
    storiesBySeries.grouped.every((s) => s.stories.length === 0) &&
    storiesBySeries.unassignedStories.length === 0;

  return (
    <Card className="h-96 w-96 gap-0 overflow-hidden py-0 shadow">
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
      <Separator />

      <div className="w-full overflow-y-auto p-4">
        {empty ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            {query
              ? `No stories match "${query}".`
              : showArchived
                ? "No archived stories."
                : "No stories to display."}
          </p>
        ) : (
          <DragDropProvider
            onDragStart={(event) => {
              setDraggedStoryId(event.operation.source?.id as string ?? null);
            }}
            onDragEnd={(event) => {
              setDraggedStoryId(null);

              if (event.canceled) return;

              const { source, target } = event.operation;
              if (!source || !target) return;

              const storyId = source.id as string;
              const destinationId = target.id as string;

              const newSeriesId = destinationId === 'unassigned-drop-section' ? null : destinationId;

              updateStory.mutate({
                update: {
                  id: storyId,
                  series_id: newSeriesId,
                },
              });
            }}
          >
            <div className="flex flex-col gap-6 w-full">
              <UnassignedStoriesSection
                id="unassigned-drop-section"
                stories={storiesBySeries.unassignedStories}
                activeStoryId={activeStoryId}
                view={view}
                onSetActive={setActiveStoryId}
              />

              {storiesBySeries.grouped.map((currentSeries) => (
                <SeriesStoriesSection
                  id={currentSeries.seriesId}
                  key={currentSeries.seriesId}
                  seriesId={currentSeries.seriesId}
                  title={currentSeries.title}
                  description={currentSeries.description}
                  stories={currentSeries.stories}
                  activeStoryId={activeStoryId}
                  view={view}
                  menuOpen={menuOpen}
                  onMenuOpenChange={setMenuOpen}
                  onSetActive={setActiveStoryId}
                />
              ))}
            </div>

            <DragOverlay>
              {draggedStory && (
                <div className={view === 'grid' ? 'w-40' : 'w-64'}>
                  <StorySelectItem
                    story={draggedStory}
                    isActive={false}
                    view={view}
                    onSetActive={() => {}}
                  />
                </div>
              )}
            </DragOverlay>
          </DragDropProvider>
        )}
      </div>
    </Card>
  );
}

import { useMemo, useState } from 'react'
import { ArrowDownAZ, Clock, LayoutGrid, List, Search } from 'lucide-react'

import { useActiveStory } from '@/app/layouts/contexts/active-story.context'
import type { Story } from '@/entities/story'
import { Button } from '@/shared/components/shadcn/button'
import { Card } from '@/shared/components/shadcn/card'
import { Input } from '@/shared/components/shadcn/input'
import { cn } from '@/lib/utils'
import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger } from '@/shared/components/shadcn/context-menu'

type SortKey = 'lastUpdated' | 'alphabetical'
type ViewMode = 'grid' | 'list'

function formatDate(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export default function SelectMenu({ stories }: { stories: Story[] }) {
  const { activeStoryId, setActiveStoryId } = useActiveStory()

  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('lastUpdated')
  const [view, setView] = useState<ViewMode>('grid')

  const visibleStories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    const filtered = normalizedQuery
      ? stories.filter((story) =>
          story.title.toLowerCase().includes(normalizedQuery),
        )
      : stories.slice()

    filtered.sort((a, b) => {
      if (sortKey === 'alphabetical') {
        return a.title.localeCompare(b.title)
      }
      return b.lastUpdated.getTime() - a.lastUpdated.getTime()
    })

    return filtered
  }, [stories, query, sortKey])

  const empty = visibleStories.length === 0

  return (
    <Card className="w-full max-h-96 gap-0 overflow-hidden py-0 shadow">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title..."
            aria-label="Search stories by title"
            className="pl-8"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Sort controls */}
          <div
            role="group"
            aria-label="Sort stories"
            className="flex items-center rounded-lg border p-0.5"
          >
            <Button
              type="button"
              variant={sortKey === 'lastUpdated' ? 'secondary' : 'ghost'}
              size="sm"
              aria-pressed={sortKey === 'lastUpdated'}
              onClick={() => setSortKey('lastUpdated')}
            >
              <Clock aria-hidden="true" />
              Last updated
            </Button>
            <Button
              type="button"
              variant={sortKey === 'alphabetical' ? 'secondary' : 'ghost'}
              size="sm"
              aria-pressed={sortKey === 'alphabetical'}
              onClick={() => setSortKey('alphabetical')}
            >
              <ArrowDownAZ aria-hidden="true" />
              A–Z
            </Button>
          </div>

          {/* View toggle */}
          <div
            role="group"
            aria-label="View mode"
            className="flex items-center rounded-lg border p-0.5"
          >
            <Button
              type="button"
              variant={view === 'grid' ? 'secondary' : 'ghost'}
              size="icon-sm"
              aria-label="Grid view"
              aria-pressed={view === 'grid'}
              onClick={() => setView('grid')}
            >
              <LayoutGrid aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant={view === 'list' ? 'secondary' : 'ghost'}
              size="icon-sm"
              aria-label="List view"
              aria-pressed={view === 'list'}
              onClick={() => setView('list')}
            >
              <List aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-h-96 overflow-y-auto p-4">
        {empty ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            {query
              ? `No stories match "${query}".`
              : 'No stories to display.'}
          </p>
        ) : (
          <ul
            className={cn(
              view === 'grid'
                ? 'grid grid-cols-1 gap-3 sm:grid-cols-2'
                : 'flex flex-col gap-2',
            )}
          >
            {visibleStories.map((story) => {
              const isActive = story.storyId === activeStoryId
              return (
                <li key={story.storyId}>
                  <ContextMenu>
                    <ContextMenuTrigger>
                  <div
                    className={cn(
                      'flex h-full gap-3 rounded-lg border p-3 transition-colors',
                      isActive
                        ? 'border-primary bg-muted'
                        : 'hover:bg-muted/50',
                      view === 'grid' ? 'flex-col' : 'flex-row items-center',
                    )}
                  >
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-medium text-foreground">
                        {story.title}
                      </h3>
                      {view === 'grid' && (
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {story.synopsis}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-muted-foreground">
                        Updated {formatDate(story.lastUpdated)}
                      </p>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant={isActive ? 'secondary' : 'default'}
                      className={view === 'grid' ? 'self-start' : ''}
                      onClick={() => setActiveStoryId(story.storyId)}
                    >
                      {isActive ? 'Active' : 'Set Active'}
                    </Button>
                      </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuGroup>
                        <ContextMenuLabel>
                          {story.title}
                        </ContextMenuLabel>
                        <ContextMenuSeparator/>
                        <ContextMenuItem>
                          Rename
                        </ContextMenuItem>
                        <ContextMenuItem>
                          Delete
                        </ContextMenuItem>
                        <ContextMenuItem>
                          Change Cover Image
                        </ContextMenuItem>
                      </ContextMenuGroup>
                    </ContextMenuContent>
                  </ContextMenu>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </Card>
  )
}



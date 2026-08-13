import { ArrowDownAZ, Clock, LayoutGrid, List, Search, PackageOpen, Package } from 'lucide-react'
import { Button } from '@/shared/components/shadcn/button'
import { Input } from '@/shared/components/shadcn/input'
import { Toggle } from "@/shared/components/shadcn/toggle"
import AddStoryButton from '@/features/add-story/ui/add-story-button';
import AddSeriesButton from '@/features/add-series/ui/add-series-button';

type ToolbarProps = {
  query: string;
  setQuery: (query: string) => void;
  sortKey: string;
  setSortKey: (sortKey: 'lastUpdated' | 'alphabetical') => void;
  view: string;
  setView: (view: 'grid' | 'list') => void;
  isArchived: boolean,
  setShowArchived: (isArchived: boolean) => void;
  
}

export default function SelectToolbar({query, setQuery, sortKey, setSortKey, view, setView, isArchived, setShowArchived}:ToolbarProps) {
  return (
    <div className="flex flex-col gap-2 px-4 py-2">
      <div className='flex-1 flex gap-4'>
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
        <Toggle
          variant="outline"
          className="group"
          pressed={isArchived}
          onPressedChange={setShowArchived}
        >
          <Package className="group-data-[state=on]:hidden" />
          <PackageOpen className="hidden group-data-[state=on]:block" />
          <span>{isArchived ? "Hide" : "Show"} Archived</span>
        </Toggle>
      </div>
      

      <div className="flex items-center justify-end gap-2 flex-1">
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

        <div className='gap-1 flex'>
          <AddStoryButton>
            + Story
          </AddStoryButton>
          <AddSeriesButton>
            + Series
          </AddSeriesButton>
        </div>
      </div>
    </div>
  )
}
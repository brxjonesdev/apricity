import { ArrowDownAZ, Clock, LayoutGrid, List, Search } from 'lucide-react'
import { Button } from '@/shared/components/shadcn/button'
import { Input } from '@/shared/components/shadcn/input'

type ToolbarProps = {
  query: string;
  setQuery: (query: string) => void;
  sortKey: string;
  setSortKey: (sortKey: 'lastUpdated' | 'alphabetical') => void;
  view: string;
  setView: (view: 'grid' | 'list') => void;
  
}

export default function SelectToolbar({query, setQuery, sortKey, setSortKey, view, setView}:ToolbarProps) {
  return (
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

        <div>
          <Button>
            + Story
          </Button>
          <Button>
            + Series
          </Button>
        </div>
      </div>
    </div>
  )
}
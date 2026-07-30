import { useMemo } from 'react';
import type { Story } from '@/entities/story';

type SortKey = 'lastUpdated' | 'alphabetical';

export function useFilteredStories(stories: Story[], query: string, sortKey: SortKey) {
  return useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = normalizedQuery
      ? stories.filter((story) => story.title.toLowerCase().includes(normalizedQuery))
      : stories.slice();

    filtered.sort((a, b) =>
      sortKey === 'alphabetical'
        ? a.title.localeCompare(b.title)
        : b.lastUpdated.getTime() - a.lastUpdated.getTime(),
    );

    return filtered;
  }, [stories, query, sortKey]);
}
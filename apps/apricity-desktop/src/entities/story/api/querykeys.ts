export const storyQueries = {
  all: ['stories'] as const,
  lastOpened: ['stories', 'lastOpened'] as const,

  lists: () => [...storyQueries.all, 'list'] as const,

  byProject: (projectId: string) =>
    [...storyQueries.lists(), 'project', projectId] as const,

  bySeries: (seriesId: string) =>
    [...storyQueries.lists(), 'series', seriesId] as const,

  detail: (storyId: string) =>
    [...storyQueries.all, 'detail', storyId] as const,
};
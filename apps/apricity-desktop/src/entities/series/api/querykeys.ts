export const seriesQueries = {
  all: ['series'] as const,

  lists: () => [...seriesQueries.all, 'list'] as const,

  detail: (seriesId: string) =>
    [...seriesQueries.all, 'detail', seriesId] as const,
};
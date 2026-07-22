export const seriesQueries = {
  all: ['series'] as const,
  detail: (seriesId: string) => ['series', 'detail', seriesId] as const,
};

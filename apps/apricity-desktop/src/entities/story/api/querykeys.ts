export const storyQueries = {
  all: ["stories"] as const,
  detail: (storyId: string) => ['stories', "detail", storyId] as const,
  bySeries: (seriesId: string) => ['stories', 'series', seriesId] as const,
  byProject: (projectId: string) => ['stories', 'project', projectId] as const,
};

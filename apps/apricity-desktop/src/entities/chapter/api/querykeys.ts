export const chapterQueries = {
  all: ['chapters'] as const,

  lists: () => [...chapterQueries.all, 'list'] as const,

  byStory: (storyId: string) =>
    [...chapterQueries.lists(), 'story', storyId] as const,

  detail: (chapterId: string) =>
    [...chapterQueries.all, 'detail', chapterId] as const,
};
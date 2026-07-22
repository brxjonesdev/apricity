export const storyQueries = {
  story: {
    list: () => ['stories', 'list'] as const,
    detail: (storyId: string) => ['stories', 'detail', storyId] as const,
  },
};

export const chapterQueries = {
  all: ['chapters'] as const,
  detail: (chapterId: string) => [`chapters`, chapterId] as const,
  byStory: (storyId: string) => ['chapters', 'story', storyId] as const,
};

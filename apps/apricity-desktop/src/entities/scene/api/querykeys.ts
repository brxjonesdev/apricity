export const sceneQueries = {
  all: ['scenes'] as const,

  lists: () => [...sceneQueries.all, 'list'] as const,

  detail: (sceneId: string) =>
    [...sceneQueries.all, 'detail', sceneId] as const,

  byChapter: (chapterId: string) =>
    [...sceneQueries.lists(), 'chapter', chapterId] as const,

  byStory: (storyId: string) => 
    [...sceneQueries.lists(), 'story', storyId] as const
};
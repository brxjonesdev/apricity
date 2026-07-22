export const sceneQueries = {
  all: ["scenes"] as const,
  detail: (sceneId: string) => ["scenes", sceneId],
  byChapter: (chapterId: string) => ["chapters", chapterId, "scenes"] as const,
}

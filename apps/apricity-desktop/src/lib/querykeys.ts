export const queryKeys = {
  library: {
    list: () => ["stories", "list"] as const,
    detail: (storyId: string) => ["stories", "detail", storyId] as const,
  },

  characters: {
    list: (storyId: string) => ["characters", "list", storyId] as const,

    detail: (characterId: string) =>
      ["characters", "detail", characterId] as const,
  },

  locations: {
    list: (storyId: string) => ["locations", "list", storyId] as const,

    detail: (locationId: string) =>
      ["locations", "detail", locationId] as const,
  },

  events: {
    list: (storyId: string) => ["events", "list", storyId] as const,

    detail: (eventId: string) => ["events", "detail", eventId] as const,
  },

  notes: {
    list: (storyId: string) => ["notes", "list", storyId] as const,

    detail: (noteId: string) => ["notes", "detail", noteId] as const,
  },

  outline: {
    acts: {
      list: (storyId: string) => ["acts", "list", storyId] as const,

      detail: (actId: string) => ["acts", "detail", actId] as const,
    },

    plotPoints: {
      list: (storyId: string) => ["plot_points", "list", storyId] as const,

      detail: (plotPointId: string) =>
        ["plot_points", "detail", plotPointId] as const,
    },
  },

  structure: {
    chapters: {
      list: (storyId: string) => ["chapters", "list", storyId] as const,

      detail: (chapterId: string) => ["chapters", "detail", chapterId] as const,
    },

    scenes: {
      list: (storyId: string) => ["scenes", "list", storyId] as const,

      detail: (sceneId: string) => ["scenes", "detail", sceneId] as const,
    },
  },
};

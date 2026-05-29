// ===============================
// QUERY KEY SYSTEM (Apricity)
// ===============================
//
// Mental model:
// [model, projection, id?, params?]
//
// model      → the entity type (characters, events, scenes)
// projection → what kind of view of the data you want
//               (list, detail, graph, timeline, etc.)
// id         → optional identifier for single-entity views
// params     → optional filters / pagination / search
//
// This system exists because Apricity is NOT CRUD.
// It is a GRAPH system with multiple projections over the same data.
// ===============================

export const queryKeys = {
  // ===============================
  // CHARACTERS
  // ===============================
  characters: {
    // LIST PROJECTION
    //
    // Meaning:
    // "Give me many characters for a story"
    //
    // Shape:
    // Character[]
    //
    // Used in:
    // - Library page
    // - Sidebar lists
    // - Dropdowns
    list: (storyId: string) => ["characters", "list", storyId] as const,

    // DETAIL PROJECTION
    //
    // Meaning:
    // "Give me ONE character (full entity)"
    //
    // Shape:
    // Character
    //
    // Used in:
    // - Character editor
    // - Inspector panel
    // - Graph node detail view
    detail: (characterId: string) =>
      ["characters", "detail", characterId] as const,

    // GRAPH PROJECTION
    //
    // Meaning:
    // "Give me this character + relationships"
    //
    // Shape:
    // Character + edges + connected nodes
    //
    // Used in:
    // - GraphView
    // - Relationship panel
    // - Network exploration
    graph: (characterId: string) =>
      ["characters", "graph", characterId] as const,

    // TIMELINE PROJECTION (derived view)
    //
    // Meaning:
    // "Where does this character appear in story time?"
    //
    // Shape:
    // Timeline events
    //
    // Used in:
    // - Timeline view
    // - Story progression analysis
    timeline: (storyId: string) => ["characters", "timeline", storyId] as const,
  },

  // ===============================
  // EVENTS
  // ===============================
  events: {
    list: (storyId: string) => ["events", "list", storyId] as const,

    detail: (eventId: string) => ["events", "detail", eventId] as const,

    graph: (eventId: string) => ["events", "graph", eventId] as const,

    timeline: (storyId: string) => ["events", "timeline", storyId] as const,
  },

  // ===============================
  // SCENES
  // ===============================
  scenes: {
    list: (storyId: string) => ["scenes", "list", storyId] as const,

    detail: (sceneId: string) => ["scenes", "detail", sceneId] as const,
  },

  // ===============================
  // STORY (GLOBAL ROOT)
  // ===============================
  story: {
    detail: (storyId: string) => ["story", "detail", storyId] as const,

    // FULL GRAPH VIEW OF ENTIRE STORY
    graph: (storyId: string) => ["story", "graph", storyId] as const,

    // DERIVED TIMELINE OF ENTIRE STORY
    timeline: (storyId: string) => ["story", "timeline", storyId] as const,
  },
};

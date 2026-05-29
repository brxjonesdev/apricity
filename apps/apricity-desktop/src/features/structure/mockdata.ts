import type { Chapter, Scene } from "./types";

const now = new Date().toISOString();

export const mockChapters: Chapter[] = [
  {
    id: "chapter_1",
    storyId: "book_1",
    title: "Shattered Reflections",
    summary: "The protagonist discovers the mirror artifact during a storm.",
    order: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "chapter_2",
    storyId: "book_1",
    title: "The Hollow Cathedral",
    summary:
      "The group journeys into an abandoned cathedral filled with echoes.",
    order: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "chapter_3",
    storyId: "book_1",
    title: "Ashfall",
    summary:
      "The kingdom descends into chaos as war spreads across the capital.",
    order: 3,
    createdAt: now,
    updatedAt: now,
  },
];

export const mockScenes: Scene[] = [
  {
    id: "scene_1",
    storyId: "book_1",
    chapterId: "chapter_1",
    title: "The Storm Arrives",
    content:
      "Heavy rain crashes against the windows as the mirror begins to glow.",
    order: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "scene_2",
    storyId: "book_1",
    chapterId: "chapter_1",
    title: "First Contact",
    content:
      "A mysterious figure appears in the reflection and whispers a warning.",
    order: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "scene_3",
    storyId: "book_1",
    chapterId: "chapter_2",
    title: "The Cathedral Gates",
    content:
      "Ancient doors open slowly as forgotten hymns echo through the hall.",
    order: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "scene_4",
    storyId: "book_1",
    chapterId: "chapter_3",
    title: "City of Embers",
    content:
      "Fires consume the skyline while soldiers flee the collapsing capital.",
    order: 1,
    createdAt: now,
    updatedAt: now,
  },
];

import { ChapterDB, SceneDB } from "@/features/structure";

const now = new Date().toISOString();

export const mockChapters: ChapterDB[] = [
  {
    id: "chapter_1",
    storyId: "book_1",
    title: "Shattered Reflections",
    summary: "The protagonist discovers the mirror artifact during a storm.",
    order: 1,
    createdAt: now,
    lastUpdatedAt: now,
  },
  {
    id: "chapter_2",
    storyId: "book_1",
    title: "The Hollow Cathedral",
    summary:
      "The group journeys into an abandoned cathedral filled with echoes.",
    order: 2,
    createdAt: now,
    lastUpdatedAt: now,
  },
  {
    id: "chapter_3",
    storyId: "book_1",
    title: "Ashfall",
    summary:
      "The kingdom descends into chaos as war spreads across the capital.",
    order: 3,
    createdAt: now,
    lastUpdatedAt: now,
  },
];

export const mockScenes: SceneDB[] = [
  {
    id: "scene_1",
    storyId: "book_1",
    chapterId: "chapter_1",
    synopsis:
      "The protagonist stumbles upon a hidden mirror in a stormy night.",
    title: "The Storm Arrives",
    order: 1,
    createdAt: now,
    lastUpdatedAt: now,
  },
  {
    id: "scene_2",
    storyId: "book_1",
    chapterId: "chapter_1",
    title: "First Contact",
    order: 2,
    createdAt: now,
    lastUpdatedAt: now,
    synopsis:
      "The protagonist encounters a mysterious figure in the cathedral.",
  },
  {
    id: "scene_3",
    storyId: "book_1",
    chapterId: "chapter_2",
    title: "The Cathedral Gates",
    synopsis:
      "Ancient doors open slowly as forgotten hymns echo through the hall.",
    order: 1,
    createdAt: now,
    lastUpdatedAt: now,
  },
  {
    id: "scene_4",
    storyId: "book_1",
    chapterId: "chapter_3",
    title: "City of Embers",
    synopsis:
      "Fires consume the skyline while soldiers flee the collapsing capital.",
    order: 1,
    createdAt: now,
    lastUpdatedAt: now,
  },
];

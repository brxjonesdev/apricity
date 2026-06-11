import { StoryDB } from "../story.db";

export let mockStories: StoryDB[] = [
  {
    id: "book_1",
    userId: null,
    title: "Ashes of the Hollow Sun",
    seriesId: null,
    synopsis:
      "A dying empire searches for a machine hidden beneath a desert that can restart the sun.",
    coverImage:
      "https://thebiaslist.com/wp-content/uploads/2026/03/irene-biggest-fan.jpg",
    genre: ["Cyberpunk"],
    status: "in-progress",
    syncStatus: "local",
    lastUpdated: "2026-05-20T14:22:00Z",
    createdAt: "2026-04-01T10:00:00Z",
    deletedAt: null,
  },
  {
    id: crypto.randomUUID(),
    userId: null,
    title: "Velvet Static",
    seriesId: null,
    synopsis:
      "A late-night radio host begins hearing broadcasts from timelines that no longer exist.",
    coverImage: null,
    genre: ["Cyberpunk"],
    status: "draft",
    syncStatus: "local",
    lastUpdated: "2026-05-18T08:40:00Z",
    createdAt: "2026-05-01T08:00:00Z",
    deletedAt: null,
  },
];

// export const mockSeries: Series[] = [
//   {
//     id: "series-1",
//     title: "The New Series",
//   },
// ];

import type { Note } from "./types";

export const mockNotes: Note[] = [
  {
    id: "note_1",
    storyId: "book_1",
    content:
      "The mirror system should visually crack whenever magic is overused.",
    color: "#A5D8FF",
    entityId: "char_1",
  },
  {
    id: "note_2",
    storyId: "book_1",
    content: "Need stronger motivation for the antagonist before Act 2.",
    color: "#FFD6A5",
    entityId: "plot_3",
  },
  {
    id: "note_3",
    storyId: "book_1",
    content: "The cathedral should feel ancient and submerged in silence.",
    color: "#CAFFBF",
    entityId: "loc_2",
  },
  {
    id: "note_4",
    storyId: "book_1",
    content: "Add a recurring raven motif tied to prophecy scenes.",
    color: "#FFADAD",
  },
];

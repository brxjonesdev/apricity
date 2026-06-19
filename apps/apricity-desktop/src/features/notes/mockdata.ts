import { NoteDB } from "@/features/notes";

export const mockNotes: NoteDB[] = [
  {
    id: "1",
    storyId: "book_1",
    text: "This is a note for book 1.",
    color: "#FF0000",
    createdAt: new Date("2023-08-15T14:30:00Z").toISOString(),
    lastEditedAt: new Date("2023-08-16T10:45:00Z").toISOString(),
    linkedEntityIds: [], // link some later on
    tags: ["tag1", "tag2"],
    isArchived: false,
  },
  {
    id: "2",
    storyId: "book_2",
    text: "This is a note for book 2.",
    color: "#00FF00",
    createdAt: new Date("2023-08-16T15:45:00Z").toISOString(),
    lastEditedAt: null,
    linkedEntityIds: ["chapter_1", "character_1"],
    tags: [],
    isArchived: false,
  },
  {
    id: "3",
    storyId: "book_3",
    text: "This is a note for book 3.",
    color: "#0000FF",
    createdAt: new Date("2023-08-17T16:15:00Z").toISOString(),
    lastEditedAt: null,
    linkedEntityIds: [],
    tags: ["tag3"],
    isArchived: true, // archived note
  },
];

export type NoteDB = {
  id: string;
  storyId: string;
  text: string; // markdown
  createdAt: string;
  lastEditedAt?: string | null;
  linkedEntityIds: string[] | null;
  color: string | null;
  tags: string[] | null;
  isArchived: boolean;
};

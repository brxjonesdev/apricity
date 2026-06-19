export type NoteDTO = {
  id: string;
  storyId?: string;
  text?: string;
  createdAt?: string;
  lastEditedAt?: string | null;
  linkedEntityIds?: string[] | null;
  color?: string | null;
  tags: string[] | null;
  isArchived?: boolean;
};

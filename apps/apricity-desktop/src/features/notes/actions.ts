import { Note } from "@/features/notes";
import { call } from "@/shared/api/tauriClient";

// Create a Note
export function createNote(input: {
  storyId: string;
  title?: string;
  content: string;
}) {
  return call<Note>("create_note", { input });
}

// Update a Note
export function updateNote(input: {
  id: string;
  title?: string;
  content?: string;
}) {
  return call<Note>("update_note", { input });
}

// Delete a Note
export function deleteNote(id: string) {
  return call<boolean>("delete_note", { id });
}

// Link Note to graph entity
export function linkNoteToEntity(input: {
  noteId: string;
  entityType: "character" | "event" | "location" | "group";
  entityId: string;
  type: string;
}) {
  return call<boolean>("create_entity_link", {
    fromType: "note",
    fromId: input.noteId,
    toType: input.entityType,
    toId: input.entityId,
    relationship: input.type,
  });
}

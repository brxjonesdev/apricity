import { NoteDTO, NoteDB, NoteForm } from "@/features/notes";
import { call } from "@/shared/lib/api/tauriClient";
import { USE_MOCKS } from "@/shared/config/env";
import { mockNotes } from "./mockdata";
import { noteEntity } from "@/features/notes";
import { success } from "@/shared/types";

export function getAllNotes(storyId: string) {
  if (USE_MOCKS) {
    const notes = mockNotes.filter((note) => note.storyId === storyId);
    return Promise.resolve(success(notes.map((n) => noteEntity.dbToDTO(n))));
  }
  return call<NoteDTO[]>("get_story_notes", { storyId });
}

export function getNoteById(id: string) {
  if (USE_MOCKS) {
    const note = mockNotes.find((note) => note.id === id);
    if (!note) throw new Error("Note not found");
    return Promise.resolve(success(noteEntity.dbToDTO(note)));
  }
  return call<NoteDTO>("get_note", { id });
}

export function createNote({
  input,
  storyId,
}: {
  input: NoteForm;
  storyId: string;
}) {
  if (USE_MOCKS) {
    const newNote: NoteDB = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      lastEditedAt: new Date().toISOString(),
      isArchived: false,
      storyId: storyId,
    };
    mockNotes.push(newNote);
    return Promise.resolve(success(noteEntity.dbToDTO(newNote)));
  }
  return call<NoteDTO>("create_note", { input });
}

export function updateNote({
  input,
  noteId,
}: {
  input: NoteForm;
  noteId: string;
}) {
  if (USE_MOCKS) {
    const index = mockNotes.findIndex((n) => n.id === noteId);
    if (index < 0) throw Error("Note not found");
    mockNotes[index] = {
      ...mockNotes[index],
      ...input,
      lastEditedAt: new Date().toISOString(),
    };
    return Promise.resolve(success(noteEntity.dbToDTO(mockNotes[index])));
  }
  return call<NoteDTO>("update_note", { input });
}

export function deleteNote(id: string) {
  if (USE_MOCKS) {
    const index = mockNotes.findIndex((n) => n.id === id);
    if (index < 0) throw Error("Note not found");
    mockNotes.splice(index, 1);
    return Promise.resolve(success(true));
  }
  return call<boolean>("delete_note", { id });
}

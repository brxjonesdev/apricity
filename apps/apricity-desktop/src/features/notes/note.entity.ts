import { NoteDB } from "./note.db";
import { NoteDTO } from "./note.dto";
import { NoteForm } from "./form.types";
import { defineEntity } from "@/shared/lib/entity/defineApricityEntity";

export const noteEntity = defineEntity<NoteDB, NoteDTO, NoteForm>({
  dbToDTO(db) {
    return {
      id: db.id,
      storyId: db.storyId,
      text: db.text,
      linkedEntityIds: db.linkedEntityIds || [],
      color: db.color,
      tags: db.tags || [],
      isArchived: db.isArchived,
    };
  },
  dtoToForm(dto) {
    return {
      text: dto.text || "",
      tags: dto.tags || [],
      linkedEntityIds: dto.linkedEntityIds || [],
      color: dto.color || "default",
    };
  },
  formToDTO(form) {
    return {
      text: form.text,
      tags: form.tags,
      linkedEntityIds: form.linkedEntityIds,
      color: form.color,
    };
  },
});

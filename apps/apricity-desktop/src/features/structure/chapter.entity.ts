import { ChapterDB } from "./structure.db";
import { ChapterDTO } from "./structure.dto";
import { ChapterForm } from "./form-types";
import { defineEntity } from "@/shared/lib/entity/defineApricityEntity";

export const chapterEntity = defineEntity<ChapterDB, ChapterDTO, ChapterForm>({
  dbToDTO(db) {
    return {
      id: db.id,
      title: db.title,
      storyId: db.storyId,
      summary: db.summary || "",
      order: db.order,
    };
  },
  dtoToForm(dto) {
    return {
      title: dto.title || "",
      summary: dto.summary || "",
    };
  },
  formToDTO(form) {
    return {
      title: form.title,
      summary: form.summary,
    };
  },
});

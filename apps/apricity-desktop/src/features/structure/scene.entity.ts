import { SceneDB } from "./structure.db";
import { SceneDTO } from "./structure.dto";
import { SceneForm } from "./form-types";
import { defineEntity } from "@/shared/lib/entity/defineApricityEntity";

export const sceneEntity = defineEntity<SceneDB, SceneDTO, SceneForm>({
  dbToDTO(db) {
    return {
      id: db.id,
      title: db.title,
      storyId: db.storyId,
      chapterID: db.chapterId,
      synopsis: db.synopsis || "",
      order: db.order,
    };
  },
  dtoToForm(dto) {
    return {
      title: dto.title,
      synopsis: dto.synopsis || "",
    };
  },
  formToDTO(form) {
    return {
      title: form.title,
      synopsis: form.synopsis,
    };
  },
});

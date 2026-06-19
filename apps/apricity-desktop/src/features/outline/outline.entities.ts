import { ActDB } from "./outline.db";
import { ActDTO } from "./outline.dto";
import { ActForm } from "./form-types";
import { PlotPointDB } from "./outline.db";
import { PlotPointDTO } from "./outline.dto";
import { PlotPointForm } from "./form-types";
import { defineEntity } from "@/shared/lib/entity/defineApricityEntity";

export const actEntity = defineEntity<ActDB, ActDTO, ActForm>({
  dbToDTO(db) {
    return {
      id: db.id,
      storyId: db.storyId,
      title: db.title,
      type: db.type,
      order: db.order,
      isArchived: db.isArchived,
    };
  },
  dtoToForm(dto) {
    return {
      title: dto.title,
      description: dto.description || "",
      type: dto.type,
      isArchived: dto.isArchived,
    };
  },
  formToDTO(form) {
    return {
      title: form.title,
      description: form.description,
      type: form.type,
      isArchived: form.isArchived,
    };
  },
});

export const plotPointEntity = defineEntity<
  PlotPointDB,
  PlotPointDTO,
  PlotPointForm
>({
  dbToDTO(db) {
    return {
      id: db.id,
      storyId: db.storyId,
      title: db.title,
      actId: db.actId,
      description: db.description || "",
      order: db.order,
      type: db.type,
      otherDescription: db.otherDescription || "",
      importance: db.importance,
    };
  },
  dtoToForm(dto) {
    return {
      title: dto.title,
      description: dto.description || "",
      actId: dto.actId,
      type: dto.type,
      otherDescription: dto.otherDescription || "",
      importance: dto.importance,
    };
  },
  formToDTO(form) {
    return {
      title: form.title,
      description: form.description,
      type: form.type,
      otherDescription: form.otherDescription,
      importance: form.importance,
    };
  },
});

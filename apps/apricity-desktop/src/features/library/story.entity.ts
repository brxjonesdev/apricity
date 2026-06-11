import { StoryDB } from "@/features/library/story.db";
import { StoryDTO } from "@/features/library/story.dto";
import { StoryForm } from "@/features/library/components/forms/create-story/story-form-types";
import { defineEntity } from "@/shared/entity/defineApricityEntity";

export const storyEntity = defineEntity<StoryDB, StoryDTO, StoryForm>({
  dbToDTO(db) {
    return {
      id: db.id,
      title: db.title,
      status: db.status,
      seriesId: db.seriesId ?? null,
      synopsis: db.synopsis ?? "",
      lastUpdated: db.lastUpdated,
      coverImage: db.coverImage ?? "",
      genre: db.genre ?? [],
    };
  },
  dtoToForm(dto) {
    return {
      title: dto.title,
      seriesID: dto.seriesId,
      synopsis: dto.synopsis,
      coverImage: dto.coverImage ?? "",
      genre: dto.genre,
      status: dto.status,
    };
  },
  formToDTO(form) {
    return {
      title: form.title,
      synopsis: form.synopsis || "",
      seriesId: form.seriesID,
      coverImage: form.coverImage || null,
      genre: form.genre,
      status: form.status ?? "draft",
    };
  },
});

import { mockStories } from "@/features/library";
import { StoryCreateInput, StoryDTO } from "./story.dto";
import { call } from "@/shared/api/tauriClient";
import { USE_MOCKS } from "@/shared/config/env";
import { success } from "@/shared/types";
import { StoryDB } from "./story.db";
import { storyEntity } from "./story.entity";

// Read/Get all stories
export function getUserLibrary() {
  if (USE_MOCKS) {
    return Promise.resolve(
      success(mockStories.map((story) => storyEntity.mapDbToDTO(story))),
    );
  }
  return call<StoryDTO[]>("get_user_library");
}

// Get story by ID
export function getStoryById(id: string) {
  if (USE_MOCKS) {
    const story = mockStories.find((s) => s.id === id);
    if (!story) throw Error("Story not found");
    return Promise.resolve(success(storyEntity.mapDbToDTO(story)));
  }
  return call<StoryDTO>("get_story_by_id", { id });
}

// Add a new story to library
export function addStory(input: StoryCreateInput) {
  if (USE_MOCKS) {
    const newStory: StoryDB = {
      id: crypto.randomUUID(),
      userId: null,
      ...input,
      status: "draft",
      seriesId: null,
      coverImage: null,
      syncStatus: "local",
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      deletedAt: null,
    };
    if (mockStories.find((s) => s.id === newStory.id)) {
      throw Error("Duplicate story ID");
    }
    mockStories.push(newStory);
    return Promise.resolve(success(storyEntity.mapDbToDTO(newStory)));
  }
  return call<StoryDTO>("add_new_story", { input });
}

// Update story details
export function updateStory(updates: StoryDTO) {
  if (USE_MOCKS) {
    const index = mockStories.findIndex((s) => s.id === updates.id);
    if (index < 0) throw Error("Story not found");
    mockStories[index] = {
      ...mockStories[index],
      title: updates.title,
      synopsis: updates.synopsis,
      genre: updates.genre,
      status: updates.status,
      lastUpdated: new Date().toISOString(),
    };

    return Promise.resolve(success(storyEntity.mapDbToDTO(mockStories[index])));
  }
  return call<StoryDTO>("update_story_details", { updates });
}

// Archive story
// FIX: Added USE_MOCKS guard so this doesn't call the Tauri backend in mock mode.
// export function archiveStory(id: string) {
//   if (USE_MOCKS) {
//     const index = mockStories.findIndex((s) => s.id === id);
//     if (index < 0) throw Error("Story not found");
//     mockStories[index] = { ...mockStories[index], syncStatus: "archived" };
//     return Promise.resolve(success(true));
//   }
//   return call<boolean>("archive_story", { id });
// }

// Delete Story and it's children
export function deleteStory(id: string) {
  if (USE_MOCKS) {
    const index = mockStories.findIndex((s) => s.id === id);
    if (index < 0) throw Error("Story not found");
    mockStories.splice(index, 1);
    return Promise.resolve(success(true));
  }
  return call<boolean>("delete_story", { id });
}

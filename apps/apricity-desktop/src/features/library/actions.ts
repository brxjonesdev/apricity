import {
  mockStories,
  type Story,
  type StoryCreate,
  type StoryUpdate,
} from "@/features/library";
import { call } from "@/shared/api/tauriClient";
import { USE_MOCKS } from "@/shared/config/env";
import { success } from "@/shared/types";

// Read/Get all stories
export function getUserLibrary() {
  console.log("meow");
  if (USE_MOCKS) {
    return Promise.resolve(success(mockStories));
  }
  return call<Story[]>("get_user_library");
}

// Get story by ID
export function getStoryById(id: string) {
  if (USE_MOCKS) {
    return Promise.resolve(success(mockStories.find((s) => s.id === id)));
  }
  return call<Story>("get_story_by_id", { id });
}

// Add a new story to library
export function addStory(input: StoryCreate) {
  if (USE_MOCKS) {
    const newStory: Story = {
      ...input,
      id: crypto.randomUUID(),
      syncStatus: "local",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    };
    if (mockStories.find((s) => s.id === newStory.id)) {
      throw Error("Duplicate story ID");
    }
    mockStories.push(newStory);
    return Promise.resolve(success(newStory));
  }
  return call<Story>("add_new_story", { input });
}

// Update story details
export function updateStory(updates: StoryUpdate) {
  if (USE_MOCKS) {
    const index = mockStories.findIndex((s) => s.id === updates.id);
    if (index < 0) throw Error("Story not found");
    mockStories[index] = { ...mockStories[index], ...updates };
    return Promise.resolve(success(mockStories[index]));
  }
  return call<Story>("update_story_details", { updates });
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
    mockStories.splice(index, 1); // Remove story from array
    return Promise.resolve(success(true));
  }
  return call<boolean>("delete_story", { id });
}

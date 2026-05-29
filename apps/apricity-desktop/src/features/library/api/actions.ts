import type { Story, StoryCreate, StoryUpdate } from "@/features/library";
import { call } from "@/shared/api/tauriClient";

// Read/Get all stories
export function getUserLibrary() {
  return call<Story[]>("get_user_library");
}

// Get story by ID
export function getStoryById(id: string) {
  return call<Story>("get_story_by_id", { id });
}

// Add a new story to library
export function addStory(input: StoryCreate) {
  return call<Story>("add_new_story", { input });
}

// Update story details
export function updateStory(updates: StoryUpdate) {
  return call<Story>("update_story_details", { updates });
}

// Archive story
export function archiveStory(id: string) {
  return call<boolean>("archive_story", { id });
}

// Delete Story and it's children
export function deleteStory(id: string) {
  return call<boolean>("delete_story", { id });
}

import { Event, EventCreateInput, EventUpdateInput } from "@/features/events";
import { call } from "@/shared/api/tauriClient";

// Get all events
export function getAllEvents(storyId: string) {
  return call<Event[]>("get_all_events", { storyId });
}

// Get one event
export function getEventById(id: string) {
  return call<Event>("get_event", { id });
}

// Create new event
export function createEvent(input: EventCreateInput) {
  return call<Event>("create_event", { input });
}

// Update event
export function updateEvent(input: EventUpdateInput) {
  const id = input.id;
  const updates = input.updates;
  return call<Event>("update_event", { id, updates });
}

// Delete event
export function deleteEvent(id: string) {
  return call<boolean>("delete_event", { id });
}

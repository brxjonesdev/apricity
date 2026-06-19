import {
  Location,
  LocationCreateInput,
  LocationUpdateInput,
} from "@/features/locations";
import { call } from "@/shared/lib/api/tauriClient";
// Get all locations
export function getAllLocations(storyId: string) {
  return call<Location[]>("get_all_locations", { storyId });
}
// Get location by Id
export function getLocationByID(id: string) {
  return call<Location>("get_location", { id });
}
// Create new location
export function createLocation(input: LocationCreateInput) {
  return call<Location>("create_new_location", { input });
}
// Update a location
export function updateLocation(input: LocationUpdateInput) {
  const id = input.id;
  const updates = input.updates;
  return call<Location>("update_location", { id, updates });
}
// Delete a location
export function deleteLocation(id: string) {
  return call<boolean>("delete_location", { id });
}

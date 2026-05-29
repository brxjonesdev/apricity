import {
  Character,
  CharacterCreateInput,
  CharacterUpdateInput,
  Relationship,
  RelationshipCreateInput,
  RelationshipUpdateInput,
  Group,
  GroupCreateInput,
  GroupUpdateInput,
  GroupMembership,
  GroupMembershipCreateInput,
  GroupMembershipUpdateInput,
} from "@/features/characters";

import { call } from "@/shared/api/tauriClient";

// --------------------------------- //
// Characters
// --------------------------------- //

// Get all characters in the story
export function getAllCharacters(storyId: string) {
  return call<Character[]>("get_all_characters", { storyId });
}

// Get one character by ID
export function getCharacterById(characterId: string) {
  return call<Character>("get_character", { characterId });
}

// Create character
export function createCharacter(input: CharacterCreateInput) {
  return call<Character>("add_character", { input });
}

// Update character
export function updateCharacter(updates: CharacterUpdateInput) {
  const characterId = updates.characterId;
  const changes = updates.updates;
  return call<Character>("update_character", {
    characterId,
    changes,
  });
}

// Archive character
export function archiveCharacter(characterId: string) {
  return call<Character>("archive_character", {
    characterId,
  });
}

// Delete character
export function deleteCharacter(characterId: string) {
  return call<boolean>("delete_character", {
    characterId,
  });
}

// --------------------------------- //
// Relationships
// --------------------------------- //

// Get all relationships in story
export function getAllRelationships(storyId: string) {
  return call<Relationship[]>("get_all_character_relationships", { storyId });
}

// Get relationship by ID
export function getRelationshipById(id: string) {
  return call<Relationship>("get_character_relationship", {
    id,
  });
}

// Create relationship
export function createRelationship(input: RelationshipCreateInput) {
  return call<Relationship>("create_new_relationship", { input });
}

// Update relationship
export function updateRelationship(
  id: string,
  updates: RelationshipUpdateInput,
) {
  return call<Relationship>("update_relationship", {
    id,
    updates,
  });
}

// Delete relationship
export function deleteRelationship(id: string) {
  return call<boolean>("delete_relationship", {
    id,
  });
}

// --------------------------------- //
// Groups
// --------------------------------- //

// Get all groups
export function getAllGroups(storyId: string) {
  return call<Group[]>("get_all_groups", {
    storyId,
  });
}

// Get group by ID
export function getGroupById(id: string) {
  return call<Group>("get_group_details", {
    id,
  });
}

// Create group
export function createGroup(input: GroupCreateInput) {
  return call<Group>("create_group", {
    input,
  });
}

// Update group
export function updateGroup(id: string, updates: GroupUpdateInput) {
  return call<Group>("update_group", {
    id,
    updates,
  });
}

// Delete group
export function deleteGroup(id: string) {
  return call<boolean>("delete_group", {
    id,
  });
}

// --------------------------------- //
// Group Memberships
// --------------------------------- //

// Get all memberships for a group
export function getGroupMemberships(groupId: string) {
  return call<GroupMembership[]>("get_group_memberships", { groupId });
}

// Get all memberships for a character
export function getCharacterMemberships(characterId: string) {
  return call<GroupMembership[]>("get_character_memberships", { characterId });
}

// Add group membership
export function addGroupMembership(input: GroupMembershipCreateInput) {
  return call<GroupMembership>("add_group_membership", { input });
}

// Update group membership
export function updateGroupMembership(
  id: string,
  updates: GroupMembershipUpdateInput,
) {
  return call<GroupMembership>("update_group_membership", {
    id,
    updates,
  });
}

// Remove group membership
export function removeGroupMembership(id: string) {
  return call<boolean>("remove_group_membership", { id });
}

// Events in this case are historical or lore events
// that exist independently from story structure.

// Timeline order is derived separately in:
// /graph/timeline

export type EventType =
  | "historical"
  | "political"
  | "war"
  | "disaster"
  | "religious"
  | "cultural"
  | "scientific"
  | "personal"
  | "myth"
  | "other";

export type EventImportance = "low" | "medium" | "high" | "world_changing";

export type Event = {
  id: string;
  storyId: string;
  title: string;
  description?: string;

  type: EventType;
  importance?: EventImportance;

  // Optional chronology
  occurredAt?: string; // exact date if known
  occurredAtLabel?: string; // "Age of Ash", "200 years ago"

  // Optional location linkage
  primaryLocationId?: string;

  // Narrative/world impact
  consequences?: string;
  historicalContext?: string;

  // Metadata
  tags?: string[];

  createdAt: string;
  updatedAt: string;
};

export type EventCreateInput = Omit<Event, "id" | "createdAt" | "updatedAt">;

export type EventUpdateInput = {
  id: string;
  updates: Partial<Omit<Event, "id" | "storyId" | "createdAt" | "updatedAt">>;
};

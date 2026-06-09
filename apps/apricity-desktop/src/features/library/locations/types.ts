export type LocationType =
  | "continent"
  | "country"
  | "region"
  | "city"
  | "town"
  | "village"
  | "building"
  | "landmark"
  | "dungeon"
  | "other";

export type Location = {
  id: string;
  storyId: string;

  name: string;
  description?: string;
  type: LocationType;

  parentLocationId: string | null;

  geography?: string;
  culture?: string;
  history?: string;

  importance?: "low" | "medium" | "high" | "critical";

  createdAt: string;
  updatedAt: string;
};

export type LocationCreateInput = Omit<
  Location,
  "id" | "createdAt" | "updatedAt"
>;

export type LocationUpdateInput = {
  id: string;
  updates: Partial<
    Omit<Location, "id" | "storyId" | "createdAt" | "updatedAt">
  >;
};

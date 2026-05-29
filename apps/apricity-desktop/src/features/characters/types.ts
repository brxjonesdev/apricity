// useCharacters
// useCharacter
// useRelationships
// activeCharacter context
//
export type CharacterRole =
  | "protagonist"
  | "antagonist"
  | "supporting"
  | "side"
  | "mentor"
  | "other";

export type CharacterIdentity = {
  nickname?: string;
  aliases?: string[];
  title?: string;
  pronouns?: string;
  age?: number | string;
  birthday?: string;
  occupation?: string;
};

export type CharacterTraits = {
  height?: string;
  build?: string;
  hairColor?: string;
  eyeColor?: string;
  skinTone?: string;
  notes?: string;
};

export type MBTIType =
  | "INTJ"
  | "INTP"
  | "ENTJ"
  | "ENTP"
  | "INFJ"
  | "INFP"
  | "ENFJ"
  | "ENFP"
  | "ISTJ"
  | "ISFJ"
  | "ESTJ"
  | "ESFJ"
  | "ISTP"
  | "ISFP"
  | "ESTP"
  | "ESFP";
export type EnneagramType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type EnneagramWing = `${EnneagramType}w${EnneagramType}`;

export type CharacterPersonality = {
  mbti?: MBTIType;
  mbtiNotes?: string;
  enneagram?: EnneagramType;
  enneagramWing?: string;
  enneagramInstinct?: "self_preservation" | "sexual" | "social";
  bigFive?: {
    openness: number; // 0–100
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
  zodiac?: string;
  freeformPersonality?: string;
};

export type Character = {
  id: string;
  name: string;
  storyId: string;
  role: CharacterRole;
  identity: CharacterIdentity;
  traits: CharacterTraits;
  backstory: string; // Wound and Ghost
  personality: CharacterPersonality;
  morals: string;
  motivation: string;
  goals: string;
  flaws: string;
  fearsAndDesires: string;
  createdAt: string;
  updatedAt: string;
  isPOV: boolean;
  isArchived: boolean;
  playlistUrl?: string;
};

export type RelationshipType =
  | "ally"
  | "enemy"
  | "friend"
  | "family"
  | "romantic"
  | "rival"
  | "mentor"
  | "student"
  | "other";

export type PowerDynamic =
  | "equal"
  | "character_holds_more"
  | "other_holds_more";

export type EmotionalTone =
  | "warm"
  | "cold"
  | "fraught"
  | "complicated"
  | "neutral";

export type Relationship = {
  id: string;
  storyId: string;
  fromCharacterId: string;
  toCharacterId: string;
  type: RelationshipType;
  description?: string;
  powerDynamic?: PowerDynamic;
  emotionalTone?: EmotionalTone;
  strength?: number;
  isMutual?: boolean;
  howASeesBRelationship?: string;
  howBSeesARelationship?: string;
  sharedHistory?: string;
  tensionSource?: string;
  createdAt: string;
  updatedAt: string;
};

export type Group = {
  id: string;
  storyId: string;
  name: string;
  goal?: string;
  powerStructure?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type GroupMembership = {
  id: string;
  characterId: string;
  groupId: string;
  role?: string;
  howTheyJoined?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

// --------------------------------- //

export type CharacterCreateInput = Omit<
  Character,
  "id" | "createdAt" | "updatedAt" | "isArchived"
>;

export type CharacterUpdateInput = {
  characterId: string;
  updates: Partial<
    Omit<Character, "id" | "storyId" | "createdAt" | "updatedAt">
  >;
};

export type RelationshipCreateInput = Omit<
  Relationship,
  "id" | "createdAt" | "updatedAt"
>;

export type RelationshipUpdateInput = Partial<
  Omit<Relationship, "id" | "storyId" | "createdAt" | "updatedAt">
>;

export type GroupCreateInput = Omit<Group, "id">;

export type GroupUpdateInput = Partial<Omit<Group, "id" | "storyId">>;

export type GroupMembershipCreateInput = Omit<GroupMembership, "id">;

export type GroupMembershipUpdateInput = Partial<Omit<GroupMembership, "id">>;

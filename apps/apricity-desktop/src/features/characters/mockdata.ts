import type {
  Character,
  Group,
  GroupMembership,
  Relationship,
} from "@/features/characters";

export const mockCharacters: Character[] = [
  {
    id: "char_1",
    storyId: "book_1",
    name: "Kael Veyr",
    role: "protagonist",

    identity: {
      nickname: "Ghost",
      aliases: ["The White Wolf"],
      pronouns: "he/him",
      age: 24,
      occupation: "Courier",
    },

    traits: {
      height: "6'1",
      build: "Lean",
      hairColor: "Silver",
      eyeColor: "Blue",
      skinTone: "Fair",
      notes: "Scar across left eye",
    },

    backstory:
      "Survived a failed rebellion as a child and now distrusts authority.",

    personality: {
      mbti: "INTJ",
      enneagram: 5,
      enneagramWing: "5w6",
      freeformPersonality:
        "Reserved, observant, highly strategic but emotionally distant.",
      bigFive: {
        openness: 88,
        conscientiousness: 74,
        extraversion: 21,
        agreeableness: 40,
        neuroticism: 55,
      },
    },

    morals: "Protect the innocent regardless of the cost.",
    motivation: "Expose the truth behind the empire's experiments.",
    goals: "Find the missing archive beneath Sol Harbor.",
    flaws: "Pushes people away emotionally.",
    fearsAndDesires:
      "Fears abandonment and secretly wants genuine companionship.",

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),

    isPOV: true,
    isArchived: false,

    playlistUrl: "https://open.spotify.com/playlist/37i9dQZF1DX8NTLI2TtZa6",
  },

  {
    id: "char_2",
    storyId: "book_1",
    name: "Mira Solen",
    role: "supporting",

    identity: {
      pronouns: "she/her",
      age: 27,
      occupation: "Engineer",
    },

    traits: {
      height: "5'6",
      build: "Athletic",
      hairColor: "Black",
      eyeColor: "Amber",
    },

    backstory:
      "Former military engineer who defected after witnessing civilian casualties.",

    personality: {
      mbti: "ENTP",
      enneagram: 7,
      enneagramWing: "7w8",
      freeformPersonality:
        "Fast-talking, improvisational, masks fear with humor.",
    },

    morals: "People matter more than systems.",
    motivation: "Prevent another war.",
    goals: "Destroy the empire's energy reactor network.",
    flaws: "Impulsive and reckless.",
    fearsAndDesires: "Fears becoming emotionally dependent on others.",

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),

    isPOV: false,
    isArchived: false,
  },

  {
    id: "char_3",
    storyId: "book_1",
    name: "Seraph Vale",
    role: "antagonist",

    identity: {
      title: "High Executor",
      pronouns: "she/her",
      age: "Unknown",
      occupation: "Imperial Leader",
    },

    traits: {
      height: "5'10",
      build: "Slim",
      hairColor: "White",
      eyeColor: "Gold",
    },

    backstory:
      "Rose to power during the collapse wars and believes order must be absolute.",

    personality: {
      mbti: "ENTJ",
      enneagram: 1,
      enneagramWing: "1w2",
      freeformPersonality:
        "Cold, visionary, deeply convinced she alone can save civilization.",
    },

    morals: "Order justifies sacrifice.",
    motivation: "Create permanent peace through control.",
    goals: "Unify all regions under the empire.",
    flaws: "Unable to empathize with weakness.",
    fearsAndDesires: "Fears societal collapse more than death itself.",

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),

    isPOV: false,
    isArchived: false,
  },
];

export const mockRelationships: Relationship[] = [
  {
    id: "rel_1",
    storyId: "book_1",

    fromCharacterId: "char_1",
    toCharacterId: "char_2",

    type: "ally",

    description:
      "Partners forced together during a failed mission who slowly develop trust.",

    powerDynamic: "equal",
    emotionalTone: "complicated",
    strength: 78,

    howASeesBRelationship: "Kael sees Mira as chaotic but dependable.",
    howBSeesARelationship: "Mira sees Kael as emotionally guarded but loyal.",

    sharedHistory: "Both survived the siege of Hollow Station.",
    tensionSource:
      "Mira wants openness while Kael avoids emotional attachment.",

    isMutual: true,

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  {
    id: "rel_2",
    storyId: "book_1",

    fromCharacterId: "char_1",
    toCharacterId: "char_3",

    type: "enemy",

    description:
      "Kael blames Seraph for the destruction of his childhood district.",

    powerDynamic: "other_holds_more",
    emotionalTone: "cold",
    strength: 95,

    howASeesBRelationship: "Kael views Seraph as the embodiment of tyranny.",
    howBSeesARelationship:
      "Seraph views Kael as a dangerous but useful anomaly.",

    sharedHistory: "Kael's family died during Seraph's military campaigns.",

    tensionSource:
      "Both believe they are saving the future through opposing methods.",

    isMutual: true,

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockGroups: Group[] = [
  {
    id: "group_1",
    storyId: "book_1",
    name: "The Veil Runners",
    goal: "Expose imperial corruption and free occupied territories.",
    powerStructure: "Decentralized resistance cells",
    notes: "Members communicate through encrypted radio frequencies.",
  },

  {
    id: "group_2",
    storyId: "book_1",
    name: "Solar Dominion",
    goal: "Maintain global order through centralized authority.",
    powerStructure: "Strict military hierarchy",
  },
];

export const mockGroupMemberships: GroupMembership[] = [
  {
    id: "membership_1",

    characterId: "char_1",
    groupId: "group_1",

    role: "Field Operative",

    howTheyJoined: "Rescued by the resistance after escaping prison transport.",

    notes: "Often operates independently from assigned squads.",
  },

  {
    id: "membership_2",

    characterId: "char_2",
    groupId: "group_1",

    role: "Engineer",

    howTheyJoined: "Defected from the military and brought reactor schematics.",

    notes: "Responsible for maintaining hidden communication hubs.",
  },

  {
    id: "membership_3",

    characterId: "char_3",
    groupId: "group_2",

    role: "High Executor",

    howTheyJoined: "Inherited command after the collapse wars.",

    notes: "Exercises near-total control over military operations.",
  },
];

import type { Location } from "@/features/locations";

export const mockLocations: Location[] = [
  // ── Ashes of the Hollow Sun (book_1) ──
  {
    id: "loc_1",
    storyId: "book_1",
    name: "The Ashen Empire",
    type: "country",
    parentLocationId: null,
    description:
      "A continent-spanning empire built on the theology of the Hollow Sun. Its infrastructure has been slowly crumbling since the sun's first dimming three centuries ago.",
    geography:
      "Mostly desert and scrubland in the interior; the coasts retain some agriculture through desalination.",
    culture:
      "Fatalistic and hierarchical. Citizens are organized by 'sunmark' — the generation in which their bloodline registered its first prayer to the dying light.",
    history:
      "Founded on the ruins of a pre-Dimming civilization. The Tribunal rewrote most of that history to position the empire as a chosen survivor state.",
    importance: "critical",
    createdAt: "2026-04-01T10:00:00Z",
    updatedAt: "2026-05-20T14:22:00Z",
  },
  {
    id: "loc_2",
    storyId: "book_1",
    name: "The Hollow Reach",
    type: "region",
    parentLocationId: "loc_1",
    description:
      "A vast, hyper-arid desert in the imperial interior. Temperature swings are extreme; nothing grows. Tribal nomads have navigated it for generations.",
    geography:
      "Rolling glass-sand dunes over a flat bedrock shelf. The subsurface is riddled with collapsed tunnels — remnants of the pre-Dimming civilization.",
    culture:
      "Nomadic tribes consider the desert sacred and resent imperial survey missions.",
    history:
      "The machine is buried somewhere beneath the deepest dunes, according to the archive Rho handed to Sable.",
    importance: "critical",
    createdAt: "2026-04-01T10:00:00Z",
    updatedAt: "2026-05-20T14:22:00Z",
  },
  {
    id: "loc_3",
    storyId: "book_1",
    name: "Vassel, the Capital",
    type: "city",
    parentLocationId: "loc_1",
    description:
      "The imperial capital. A city of tiered terraces cut into a plateau, built to receive the maximum amount of the sun's remaining light.",
    geography:
      "Built into the north face of the Vassel Plateau, 2,000m above sea level.",
    culture:
      "Political and religious elite reside in the upper terraces; the lower city is dense, poor, and increasingly restless.",
    history:
      "The Imperial Archives — the most complete library in the known world — sit beneath the lower city in refrigerated vaults.",
    importance: "high",
    createdAt: "2026-04-02T10:00:00Z",
    updatedAt: "2026-05-18T09:00:00Z",
  },
  {
    id: "loc_4",
    storyId: "book_1",
    name: "The Imperial Archives",
    type: "building",
    parentLocationId: "loc_3",
    description:
      "A vast underground library and records vault. Access is tiered by rank. The restricted sub-vault — where Rho once worked — is now sealed.",
    geography: "Seven subterranean floors beneath Vassel's lower city.",
    history:
      "Rho Callend worked the seventh floor for twenty years before the Tribunal classified most of its contents. The key Sable now carries opens a door that hasn't been touched since.",
    importance: "high",
    createdAt: "2026-04-02T10:00:00Z",
    updatedAt: "2026-05-15T10:00:00Z",
  },
  {
    id: "loc_5",
    storyId: "book_1",
    name: "The Machine Threshold",
    type: "dungeon",
    parentLocationId: "loc_2",
    description:
      "The buried entrance to the Hollow Sun machine. A pre-Dimming structure partially collapsed but structurally intact at its core.",
    geography:
      "Located at the deepest point of the Hollow Reach, beneath the Mirrordune ridge. Accessible only through a subsurface tunnel system.",
    importance: "critical",
    createdAt: "2026-04-03T10:00:00Z",
    updatedAt: "2026-05-20T14:22:00Z",
  },

  // ── The Lantern Choir ──
  {
    id: "loc_6",
    storyId: "book_lantern",
    name: "The Choir Citadel",
    type: "building",
    parentLocationId: null,
    description:
      "The fortified headquarters of the Lantern Choir. Part cathedral, part military academy, part prison.",
    geography: "Built on a coastal cliff overlooking the Ardent Sea.",
    culture:
      "Everything inside the citadel is regulated — meals, sleep, prayer, combat training. The children are never idle.",
    history:
      "Originally a lighthouse. The High Cantor had it expanded over three decades into its current form.",
    importance: "critical",
    createdAt: "2026-01-04T09:15:00Z",
    updatedAt: "2026-05-21T13:05:00Z",
  },
  {
    id: "loc_7",
    storyId: "book_lantern",
    name: "Wyn's Home Village — Arnset",
    type: "village",
    parentLocationId: null,
    description:
      "A small fishing village in a province occupied by the church. Where Wyn grew up before the Choir took her.",
    geography: "River delta, low-lying, prone to flooding.",
    culture:
      "Simple, communal. The village resisted conscription longer than its neighbors.",
    history:
      "Arnset was made an example — three families publicly shamed — before the remaining parents complied.",
    importance: "medium",
    createdAt: "2026-01-04T09:15:00Z",
    updatedAt: "2026-05-21T13:05:00Z",
  },

  // ── The Orchid Protocol ──
  {
    id: "loc_8",
    storyId: "book_orchid",
    name: "Seraph City",
    type: "city",
    parentLocationId: null,
    description:
      "A dense megacity built in vertical layers. The upper levels are clean and corporate; the undercity is where biotech moves without oversight.",
    geography: "Coastal. Built on reclaimed land extending into the bay.",
    culture:
      "Hyper-commercialized. Corporate citizenship tiers determine where you can go and what you can buy.",
    history:
      "Seraph City passed the Synthetic Life Act 40 years ago, legalizing artificial organisms. The Orchid Protocol is its illegal sequel.",
    importance: "critical",
    createdAt: "2026-03-15T12:30:00Z",
    updatedAt: "2026-05-17T19:10:00Z",
  },
  {
    id: "loc_9",
    storyId: "book_orchid",
    name: "The Undercity Relay Hub",
    type: "building",
    parentLocationId: "loc_8",
    description:
      "A black-market logistics node in Seraph City's undercity. Maren uses it as a drop point. It's also where the leaking package changed everything.",
    geography: "Level -4 of Seraph City. No registered address.",
    importance: "high",
    createdAt: "2026-03-16T12:30:00Z",
    updatedAt: "2026-05-17T19:10:00Z",
  },

  // ── Velvet Static ──
  {
    id: "loc_10",
    storyId: "book_velvet",
    name: "WKVS Radio Station",
    type: "building",
    parentLocationId: null,
    description:
      "A mid-size radio station in a mid-size city. Callum has hosted the late-night slot here for six years. The equipment is older than it should be.",
    geography: "Fourth floor of a converted printing building downtown.",
    culture: "Skeleton crew after midnight. Callum is usually alone.",
    history:
      "His mentor disappeared from this station four years ago. No one investigated very hard.",
    importance: "critical",
    createdAt: "2026-05-03T08:00:00Z",
    updatedAt: "2026-05-18T08:40:00Z",
  },
];

import type { Event } from "@/features/events";

export const mockEvents: Event[] = [
  // ── Ashes of the Hollow Sun (book_1) ──
  {
    id: "evt_1",
    storyId: "book_1",
    title: "The First Dimming",
    type: "disaster",
    importance: "world_changing",
    description:
      "Three hundred years before the story begins, the sun began to visibly dim. Temperatures across the continent dropped. Harvests failed over two consecutive decades.",
    occurredAtLabel: "300 years before present",
    consequences:
      "Sparked the founding theology of the Dying Sun Tribunal. Caused mass migration toward equatorial regions. The pre-Dimming civilization collapsed within a generation.",
    historicalContext:
      "Imperial scholars suppress evidence that the First Dimming was caused by the machine's original misuse — a fact still buried in the restricted sub-vault.",
    tags: ["founding_event", "sun", "disaster", "tribunal_origin"],
    createdAt: "2026-04-01T10:00:00Z",
    updatedAt: "2026-05-20T14:22:00Z",
  },
  {
    id: "evt_2",
    storyId: "book_1",
    title: "Founding of the Dying Sun Tribunal",
    type: "religious",
    importance: "world_changing",
    description:
      "A council of theologians and surviving imperial nobles codified the theology of the Hollow Sun, establishing the Tribunal as both religious and political authority.",
    occurredAtLabel: "290 years before present",
    consequences:
      "Centralized power under ecclesiastical authority. Rewrote the historical record to remove evidence of the machine's existence.",
    tags: ["tribunal", "founding_event", "religion", "politics"],
    createdAt: "2026-04-01T10:00:00Z",
    updatedAt: "2026-05-18T09:00:00Z",
  },
  {
    id: "evt_3",
    storyId: "book_1",
    title: "The Province of Askar Incineration",
    type: "disaster",
    importance: "high",
    description:
      "The secondary dimming event that destroyed Sable's home province. A localized temperature collapse incinerated the crops and froze the rivers within a single winter.",
    occurredAtLabel: "12 years before present",
    primaryLocationId: "loc_1",
    consequences:
      "Directly responsible for Sable Voss joining the Imperial corps. Killed roughly 40,000 people.",
    historicalContext:
      "The Tribunal classified Askar as a 'blessed sacrifice' — divine proof of the sun's will — in the official records.",
    tags: ["sable_backstory", "disaster", "province"],
    createdAt: "2026-04-02T10:00:00Z",
    updatedAt: "2026-05-20T14:22:00Z",
  },
  {
    id: "evt_4",
    storyId: "book_1",
    title: "Rho Callend's Archive Sealing",
    type: "political",
    importance: "high",
    description:
      "The Tribunal ordered all pre-Dimming technical records sealed and reclassified. Rho Callend, then the head archivist of the seventh floor, was forced to comply.",
    occurredAtLabel: "30 years before present",
    primaryLocationId: "loc_4",
    consequences:
      "Delayed the discovery of the machine's location by decades. Rho kept one encoded key, which he eventually passed to Sable.",
    tags: ["rho_backstory", "archive", "cover-up", "tribunal"],
    createdAt: "2026-04-03T10:00:00Z",
    updatedAt: "2026-05-15T10:00:00Z",
  },
  {
    id: "evt_5",
    storyId: "book_1",
    title: "Sable's Expedition Departs Vassel",
    type: "personal",
    importance: "high",
    description:
      "Sable leads the expedition out of the capital under the cover of an approved geological survey. The Tribunal's counter-agents begin following within a day.",
    occurredAt: "2026-03-01T06:00:00Z",
    primaryLocationId: "loc_3",
    consequences:
      "Sets the story's main plot in motion. The expedition has a head start, but the Tribunal knows something is wrong.",
    tags: ["inciting_action", "expedition", "vassel"],
    createdAt: "2026-04-04T10:00:00Z",
    updatedAt: "2026-05-20T14:22:00Z",
  },

  // ── The Lantern Choir ──
  {
    id: "evt_6",
    storyId: "book_lantern",
    title: "The First Conscription Sweep",
    type: "political",
    importance: "high",
    description:
      "The Lantern Choir conducted its first province-wide conscription sweep, taking lantern-bearing children from occupied territories by force if necessary.",
    occurredAtLabel: "Two years before present",
    consequences:
      "Roughly 200 children taken. Wyn was among the first cohort. Village resistance was brutally suppressed.",
    tags: ["conscription", "choir", "wyn_backstory"],
    createdAt: "2026-01-04T09:15:00Z",
    updatedAt: "2026-05-21T13:05:00Z",
  },
  {
    id: "evt_7",
    storyId: "book_lantern",
    title: "The Holy War Declaration",
    type: "war",
    importance: "world_changing",
    description:
      "The High Cantor declared a holy war against the northern federation, citing territorial desecration of sacred sites.",
    occurredAtLabel: "Six months before present",
    consequences:
      "Lantern-bearers are now formally classified as weapons of war. The Choir's training schedule tripled in intensity.",
    tags: ["holy_war", "choir", "declaration"],
    createdAt: "2026-01-05T09:15:00Z",
    updatedAt: "2026-05-21T13:05:00Z",
  },

  // ── The Orchid Protocol ──
  {
    id: "evt_8",
    storyId: "book_orchid",
    title: "The Synthetic Life Act",
    type: "political",
    importance: "world_changing",
    description:
      "Seraph City passed legislation legalizing artificial organisms for commercial and medical use, subject to a licensing framework.",
    occurredAtLabel: "40 years before present",
    primaryLocationId: "loc_8",
    consequences:
      "Opened the legal biotech market. Also created the black-market gap that the Orchid Protocol exploits.",
    tags: ["legislation", "synthetic_life", "seraph_city"],
    createdAt: "2026-03-16T12:30:00Z",
    updatedAt: "2026-05-17T19:10:00Z",
  },
  {
    id: "evt_9",
    storyId: "book_orchid",
    title: "The Leaking Package",
    type: "personal",
    importance: "high",
    description:
      "Maren is delivering a sealed biotech package when it ruptures. The memory inside — not a physical substance but an encoded neural map — projects directly into her consciousness.",
    occurredAtLabel: "Story present",
    primaryLocationId: "loc_9",
    consequences:
      "Maren sees a face she recognizes and cannot account for. This is the inciting event of the main plot.",
    tags: ["inciting_incident", "maren", "memory", "package"],
    createdAt: "2026-03-17T12:30:00Z",
    updatedAt: "2026-05-17T19:10:00Z",
  },

  // ── Velvet Static ──
  {
    id: "evt_10",
    storyId: "book_velvet",
    title: "The Mentor's Disappearance",
    type: "personal",
    importance: "high",
    description:
      "Callum's radio mentor, Edda Frey, walked out of WKVS mid-broadcast four years ago and was never found. No explanation was ever given publicly.",
    occurredAtLabel: "4 years before present",
    primaryLocationId: "loc_10",
    consequences:
      "Callum inherited the late-night slot. He's never fully accepted that he belongs in it.",
    tags: ["callum_backstory", "mentor", "disappearance"],
    createdAt: "2026-05-04T08:00:00Z",
    updatedAt: "2026-05-18T08:40:00Z",
  },
  {
    id: "evt_11",
    storyId: "book_velvet",
    title: "First Rogue Broadcast",
    type: "other",
    importance: "high",
    description:
      "Callum receives the first uninvited transmission on a dead frequency — a broadcast from a version of his city that sounds subtly, terribly wrong.",
    occurredAtLabel: "Story present",
    primaryLocationId: "loc_10",
    consequences:
      "Sets the story's central mystery in motion. Callum begins recording the transmissions instead of reporting them.",
    tags: ["inciting_incident", "broadcast", "callum"],
    createdAt: "2026-05-05T08:00:00Z",
    updatedAt: "2026-05-18T08:40:00Z",
  },
];

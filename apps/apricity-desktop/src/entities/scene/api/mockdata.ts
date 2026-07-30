import { SceneDTO } from './dto/scene.dto';
import { JSONContent } from '@tiptap/core';
import { mockChapters } from '@/entities/chapter';

const now = new Date().toISOString();
const loremSentences = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
  "Nulla quis sem at nibh elementum imperdiet.",
  "Duis sagittis ipsum. Praesent mauris.",
  "Fusce nec tellus sed augue semper porta.",
  "Mauris massa. Vestibulum lacinia arcu eget nulla.",
  "Class aptent taciti sociosqu ad litora torquent per conubia nostra.",
  "Curabitur sodales ligula in libero.",
  "Nam nec ante. Sed lacinia, urna non tincidunt mattis.",
  "Vestibulum volutpat pretium libero.",
  "Aenean vulputate eleifend tellus.",
  "Phasellus viverra nulla ut metus varius laoreet.",
  "Donec vitae sapien ut libero venenatis faucibus.",
  "Etiam ultricies nisi vel augue.",
  "Curabitur ullamcorper ultricies nisi.",
  "Nam eget dui. Etiam rhoncus."
];

const randomSentence = () =>
  loremSentences[Math.floor(Math.random() * loremSentences.length)];

const createParagraph = () => {
  const roll = Math.random();
  if (roll < 0.15) {
    return `"${randomSentence()}"`;
  }
  const sentenceCount = 1 + Math.floor(Math.random() * 4); // 2–8

  return Array.from(
    { length: sentenceCount },
    randomSentence
  ).join(" ");
};

export const createLoremContent = (
  paragraphCount: number,
): JSONContent => ({
  type: "doc",
  content: Array.from({ length: paragraphCount }, () => ({
    type: "paragraph",
    content: [
      {
        type: "text",
        text: createParagraph(),
      },
    ],
  })),
});

const randomParagraphs = () => {
  const roll = Math.random();

  if (roll < 0.15) return 3 + Math.floor(Math.random() * 3);   // 3–5
  if (roll < 0.75) return 8 + Math.floor(Math.random() * 8);   // 8–15
  if (roll < 0.95) return 16 + Math.floor(Math.random() * 10); // 16–25
  return 30 + Math.floor(Math.random() * 21);                  // 30–50
};


export const mockScenes: SceneDTO[] = mockChapters.flatMap((chapter) =>
  Array.from({ length: 3 }, (_, index) => ({
    scene_id: `${chapter.id}-scene-${index + 1}`,
    chapter_id: chapter.id,
    story_id: chapter.story_id,
    title: `Scene ${index + 1}`,
    synopsis: `Scene synopsis for ${chapter.title}`,
    content: createLoremContent(randomParagraphs()),
    order: index + 1,
    last_updated_at: now,
    created_at: now,
  })),
);
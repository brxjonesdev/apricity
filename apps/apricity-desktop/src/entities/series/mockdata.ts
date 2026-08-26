import { SeriesDTO } from './api/dto/series.dto';

const adjectives = [
  "Forgotten",
  "Crimson",
  "Emerald",
  "Shadow",
  "Golden",
  "Broken",
  "Ancient",
  "Silent",
  "Frozen",
  "Burning",
];
const nouns = [
  "Kingdom",
  "Empire",
  "Chronicles",
  "Legends",
  "Realm",
  "Dynasty",
  "Saga",
  "Frontier",
  "Odyssey",
  "Archives",
];

export const mockSeries: SeriesDTO[] = Array.from({ length: 8 }, (_, index) => ({
  id: `series-${String(index + 1).padStart(3, "0")}`,
  title: `The ${adjectives[index % adjectives.length]} ${nouns[Math.floor(index / adjectives.length) % nouns.length]}`,
  description: ""
}));
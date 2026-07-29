import { StoryDetailDTO } from './dto/story-detail.dto';
import { StoryGenre } from '../constants';

const now = new Date().toISOString();
const genres: StoryGenre[] = [
  "Fantasy",
  "Adventure",
];

export const mockStories: StoryDetailDTO[] = Array.from(
  { length: 12},
  (_, index) => {
    const storyNumber = index + 1;

    return {
      id: `story-${String(storyNumber).padStart(3, "0")}`,

      series_id:
        storyNumber <= 2
          ? "series-001"
          : storyNumber <= 4
            ? "series-002"
            : null,

      user_id: "user-001",

      title: `Project Story ${storyNumber}`,

      order:
        storyNumber <= 2
          ? storyNumber
          : storyNumber <= 4
            ? storyNumber - 2
            : null,

      synopsis:
        storyNumber % 3 === 0
          ? null
          : `Synopsis for Project Story ${storyNumber}.`,

      cover_image: storyNumber <= 6 ? "https://static.wikia.nocookie.net/kpop/images/7/7e/Red_Velvet_Irene_Velvet_Summer_concept_photo_3.png/revision/latest?cb=20260719154721" : null,

      genre:
        storyNumber % 4 === 0
          ? null
          : [
              genres[storyNumber % genres.length],
              "Drama",
            ],

      is_archived: false,

      status:
        storyNumber % 4 === 0
          ? 2
          : storyNumber % 3 === 0
            ? 1
            : 0,

      sync_status: 0,

      last_updated: now,

      created_at: now,

      deleted_at: null,
    };
  },
);
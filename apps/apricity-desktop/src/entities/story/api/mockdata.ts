import { StoryDetailDTO } from './dto/story-detail.dto';
import { StoryGenre } from '../constants';
import { mockSeries } from '@/entities/series';

const now = new Date().toISOString();
const genres: StoryGenre[] = [
  "Fantasy",
  "Adventure",
];

export const mockStories: StoryDetailDTO[] = Array.from(
  {
    length: 0
  },
  (_, index) => {
    const storyNumber = index + 1;

    return {
      id: `story-${String(storyNumber).padStart(3, "0")}`,

      series_id:
         storyNumber <= 4 && mockSeries.length > 0
          ? mockSeries[0].id : null,


      title: `Project Story ${storyNumber}`,

      order:
        storyNumber <= 4
          ? ["a", "b", "c", "d"][storyNumber - 1]
          : null,

      synopsis:
        storyNumber % 3 === 0
          ? null
          : `Synopsis for Project Story ${storyNumber}.`,

      cover_image: storyNumber <= 6 ? "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/%EB%A0%88%EB%93%9C%EB%B2%A8%EB%B2%B3%28Red_Velvet%29_%EC%BC%80%EC%9D%B4%EC%BD%98_%EC%9E%AC%ED%8C%AC_2024_%EB%A0%88%EB%93%9C%EC%B9%B4%ED%8E%AB_KCON_JAPAN_2024_%281%29.jpg/960px-%EB%A0%88%EB%93%9C%EB%B2%A8%EB%B2%B3%28Red_Velvet%29_%EC%BC%80%EC%9D%B4%EC%BD%98_%EC%9E%AC%ED%8C%AC_2024_%EB%A0%88%EB%93%9C%EC%B9%B4%ED%8E%AB_KCON_JAPAN_2024_%281%29.jpg": null,

      genre:
        storyNumber % 4 === 0
          ? null
          : [
              genres[storyNumber % genres.length],
              "Drama",
            ],

            is_archived: storyNumber % 2 === 0,

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
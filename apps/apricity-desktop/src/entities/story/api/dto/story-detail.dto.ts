// What the App uses
import { StoryGenre } from '../../constants';
export type StoryDetailDTO = {
  id: string;
  series_id: string | null;
  user_id: string | null;
  title: string;
  order: number | null;
  synopsis: string | null;
  cover_image: string | null;
  genre: StoryGenre[] | null;
  is_archived: boolean;
  status: 0 | 1 | 2 | 3;
  sync_status: 0 | 1 | 2 | 3;
  last_updated: string;
  created_at: string;
  deleted_at: string | null;
};

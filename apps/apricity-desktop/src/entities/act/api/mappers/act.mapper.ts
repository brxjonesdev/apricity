import { Act } from '../../model/types';
import { ActDTO } from '../dto/act.dto';

function mapAct(dto: ActDTO): Act {
  return {
    id: dto.id,
    storyId: dto.story_id,
    order: dto.order,
    title: dto.title,
    lastModifiedAt: new Date(dto.last_modified_at || '') || null,
  };
}

export const actMapper = {
  mapAct,
};

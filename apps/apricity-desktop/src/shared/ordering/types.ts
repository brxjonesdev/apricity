export type OrderScope =
  'chapter' | 'scene' | 'act' | 'plot_point' | 'group' | 'location' | 'event';

export type ReorderInput = {
  storyId: string;
  scope: OrderScope;
  parentId?: string;
  orderedIds: string[];
};

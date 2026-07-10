import { call } from '@/shared/lib/api/tauriClient';
import { ReorderInput } from '@/shared/ordering';

export function reorderEntities(input: ReorderInput) {
  return call<boolean>('reorder_entities', { input });
}

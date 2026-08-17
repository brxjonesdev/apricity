import { generateKeyBetween } from 'fractional-indexing';

export interface Orderable {
  order: string | null;
}

export function computeOrderKey<T extends Orderable>(
  items: T[],
  target: { insertBeforeId?: string } | 'end',
  getId: (item:T) => string
): string {

  const sorted = [...items].sort((a, b) => (a.order ?? '').localeCompare(b.order ?? ''));

  if (target === 'end') {
    return generateKeyBetween(sorted.at(-1)?.order ?? null, null);
  }

  const beforeIdx = sorted.findIndex(
      (item) => getId(item) === target.insertBeforeId
    );

  const prev = sorted[beforeIdx - 1]?.order ?? null;
  const next = sorted[beforeIdx]?.order ?? null;

  return generateKeyBetween(prev, next);
}
import type { ReadingItem, ReadingTileSize } from '../data/reading';

const sizeCycle: ReadingTileSize[] = ['s', 'm', 'l', 'xl'];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/** Stable “random” height tier per item when `size` is omitted. */
export function resolveTileSize(item: ReadingItem): ReadingTileSize {
  if (item.size) return item.size;
  const index = hashString(`${item.href}:${item.title}`) % sizeCycle.length;
  return sizeCycle[index]!;
}

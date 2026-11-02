import { isMixedLoaderConfig, isItemLoaderConfig } from './typeguards.utils';

const loadLevel = async () => ({ entries: [], total: 0, path: [] });
const loadItems = async () => ({ items: [], total: 0 });

describe('loader type guards', () => {
  it('tells a folder loader from an item loader and fixed items', () => {
    expect(isMixedLoaderConfig({ loadLevel })).toBe(true);
    expect(isMixedLoaderConfig({ loadItems })).toBe(false);
    expect(isMixedLoaderConfig([{ text: 'Item' }])).toBe(false);

    expect(isItemLoaderConfig({ loadItems })).toBe(true);
    expect(isItemLoaderConfig({ loadLevel })).toBe(false);
    expect(isItemLoaderConfig({ items: [] })).toBe(false);
  });
});

import { INFINITE_LOADER_ITEM_HEIGHT } from '../../Table.const';
import { getInfiniteScrollPadding } from '../getInfiniteScrollPadding';

describe('getInfiniteScrollPadding', () => {
  it('should return 0 when no infiniteScroll', () => {
    expect(getInfiniteScrollPadding()).toBe(0);
  });

  it('should return INFINITE_LOADER_ITEM_HEIGHT when prevPage has no hasMore', () => {
    expect(
      getInfiniteScrollPadding({ prevPage: { hasMore: false } } as any),
    ).toBe(INFINITE_LOADER_ITEM_HEIGHT);
  });

  it('should return 2x INFINITE_LOADER_ITEM_HEIGHT when prevPage.hasMore is true', () => {
    expect(
      getInfiniteScrollPadding({ prevPage: { hasMore: true } } as any),
    ).toBe(2 * INFINITE_LOADER_ITEM_HEIGHT);
  });

  it('should return INFINITE_LOADER_ITEM_HEIGHT when prevPage is undefined', () => {
    expect(getInfiniteScrollPadding({} as any)).toBe(
      INFINITE_LOADER_ITEM_HEIGHT,
    );
  });
});

import { describe, expect, it } from 'vitest';

import {
  MIN_LIST_WINDOW_HEIGHT,
  SEARCH_HEIGHT,
  SUBGROUP_HEADER_HEIGHT,
  TABS_HEIGHT,
} from '../constants';
import {
  getDropdownContentHeight,
  getListWindowHeight,
} from '../ContextSelectorDropdown/utils';

describe('getDropdownContentHeight', () => {
  it('subtracts only the search chrome when there are no tabs or active group', () => {
    expect(
      getDropdownContentHeight({
        outerHeight: 800,
        hasTabs: false,
        hasSearchQuery: false,
        hasActiveGroup: false,
      }),
    ).toBe(800 - SEARCH_HEIGHT);
  });

  it('subtracts the tabs height when tabs are visible and no search is active', () => {
    expect(
      getDropdownContentHeight({
        outerHeight: 800,
        hasTabs: true,
        hasSearchQuery: false,
        hasActiveGroup: false,
      }),
    ).toBe(800 - TABS_HEIGHT - SEARCH_HEIGHT);
  });

  it('drops the tabs height while searching (tabs are hidden during search)', () => {
    expect(
      getDropdownContentHeight({
        outerHeight: 800,
        hasTabs: true,
        hasSearchQuery: true,
        hasActiveGroup: false,
      }),
    ).toBe(800 - SEARCH_HEIGHT);
  });

  it('subtracts the sub-group header height when a group is active', () => {
    expect(
      getDropdownContentHeight({
        outerHeight: 800,
        hasTabs: true,
        hasSearchQuery: false,
        hasActiveGroup: true,
      }),
    ).toBe(800 - TABS_HEIGHT - SUBGROUP_HEADER_HEIGHT - SEARCH_HEIGHT);
  });
});

describe('getListWindowHeight', () => {
  it('sizes the window to the content height when it exceeds the floor', () => {
    expect(getListWindowHeight(MIN_LIST_WINDOW_HEIGHT + 120)).toBe(
      MIN_LIST_WINDOW_HEIGHT + 120,
    );
  });

  it('never shrinks below the floor for short/default dropdowns', () => {
    expect(getListWindowHeight(MIN_LIST_WINDOW_HEIGHT - 200)).toBe(
      MIN_LIST_WINDOW_HEIGHT,
    );
    expect(getListWindowHeight(0)).toBe(MIN_LIST_WINDOW_HEIGHT);
  });
});

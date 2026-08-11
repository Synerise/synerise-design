import type {
  ContextGroup,
  ContextItem,
  DropdownItemProps,
  ListTitle,
} from '../ContextSelector.types';
import {
  MIN_LIST_WINDOW_HEIGHT,
  SEARCH_HEIGHT,
  SUBGROUP_HEADER_HEIGHT,
  TABS_HEIGHT,
} from '../constants';
import { type DropdownContentHeightArgs } from './ContextSelectorDropdown.types';

export const getDropdownContentHeight = ({
  outerHeight,
  hasTabs,
  hasSearchQuery,
  hasActiveGroup,
}: DropdownContentHeightArgs): number =>
  outerHeight -
  (hasTabs && !hasSearchQuery ? TABS_HEIGHT : 0) -
  (hasActiveGroup ? SUBGROUP_HEADER_HEIGHT : 0) -
  SEARCH_HEIGHT;

export const getListWindowHeight = (dropdownContentHeight: number): number =>
  Math.max(dropdownContentHeight, MIN_LIST_WINDOW_HEIGHT);

export const isListTitle = (
  element: DropdownItemProps,
): element is ListTitle => {
  return (element as ListTitle).title !== undefined;
};

export const isGroup = (
  item: ContextItem | ContextGroup,
): item is ContextGroup => {
  return 'isGroup' in item;
};

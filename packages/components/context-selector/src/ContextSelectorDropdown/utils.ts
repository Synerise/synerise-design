import type {
  ContextGroup,
  ContextItem,
  DropdownItemProps,
  ListTitle,
} from '../ContextSelector.types';

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

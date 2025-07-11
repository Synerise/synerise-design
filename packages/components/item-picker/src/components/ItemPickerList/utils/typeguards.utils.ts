import { type ListItemProps } from '@synerise/ds-list-item';

import {
  type ItemLoaderConfig,
  type ItemsConfig,
} from '../../ItemPickerNew/ItemPickerNew.types';
import {
  ACTION_TYPES,
  type Action,
  type SearchByAction,
  type SearchInAction,
} from '../../ItemPickerNew/types/actions.types';
import {
  type BaseItemType,
  type BaseSectionType,
  type BaseSectionTypeWithFolders,
} from '../../ItemPickerNew/types/baseItemSectionType.types';
import { type TitleListItemProps } from '../ItemPickerList.types';

export const isTitle = (
  item: TitleListItemProps | ListItemProps,
): item is TitleListItemProps => {
  return 'type' in item && item.type === 'title';
};

export const isItems = <ItemType extends BaseItemType>(
  items: ItemType[] | ItemsConfig<ItemType> | ItemLoaderConfig<ItemType>,
): items is ItemType[] => {
  if (Array.isArray(items)) {
    return true;
  }
  return false;
};

export const isItemsConfig = <ItemType extends BaseItemType>(
  items: ItemType[] | ItemsConfig<ItemType> | ItemLoaderConfig<ItemType>,
): items is ItemsConfig<ItemType> => {
  if ('items' in items && Array.isArray(items.items)) {
    return true;
  }
  return false;
};

export const isWithOutSections = <
  SectionType extends BaseSectionTypeWithFolders<BaseSectionType> | undefined,
>(
  sections?: SectionType[],
): sections is undefined => {
  return sections === undefined;
};

export const isTruthy = <T>(value: T): value is NonNullable<T> => {
  return Boolean(value);
};

export const isSearchByAction = (action?: Action): action is SearchByAction => {
  return action?.actionType === ACTION_TYPES.searchBy;
};

export const isSearchInAction = (action?: Action): action is SearchInAction => {
  return action?.actionType === ACTION_TYPES.searchIn;
};

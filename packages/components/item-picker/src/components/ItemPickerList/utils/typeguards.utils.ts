import { ListItemProps } from '@synerise/ds-list-item';

import { TitleListItemProps } from '../ItemPickerList.types';

import {
  ActionType,
  BaseItemType,
  BaseSectionType,
  BaseSectionTypeWithFolders,
  ItemLoaderConfig,
  ItemsConfig,
  SearchActionType,
} from '../../ItemPickerNew/ItemPickerNew.types';

export const isTitle = (item: TitleListItemProps | ListItemProps): item is TitleListItemProps => {
  return 'type' in item && item.type === 'title';
};

export const isItems = <ItemType extends BaseItemType>(
  items: ItemType[] | ItemsConfig<ItemType> | ItemLoaderConfig<ItemType>
): items is ItemType[] => {
  if (Array.isArray(items)) {
    return true;
  }
  return false;
};

export const isItemsConfig = <ItemType extends BaseItemType>(
  items: ItemType[] | ItemsConfig<ItemType> | ItemLoaderConfig<ItemType>
): items is ItemsConfig<ItemType> => {
  if ('items' in items && Array.isArray(items.items)) {
    return true;
  }
  return false;
};

export const isWithOutSections = <SectionType extends BaseSectionTypeWithFolders<BaseSectionType> | undefined>(
  sections?: SectionType[]
): sections is undefined => {
  return sections === undefined;
};

export const isTruthy = <T>(value: T): value is NonNullable<T> => {
  return Boolean(value);
};

export const isSearchActionType = (action?: ActionType): action is SearchActionType => {
  return action?.actionType === 'search';
};

import { type Ref } from 'react';

import { type ListItemProps } from '@synerise/ds-list-item';

import type {
  BaseItemType,
  BaseSectionType,
  BaseSectionTypeWithFolders,
} from '../ItemPickerNew/types/baseItemSectionType.types';

export type ItemSelectHandler<
  ItemType extends BaseItemType,
  SectionType extends BaseSectionType | undefined,
> = SectionType extends BaseSectionType
  ? (
      item: ItemType,
      section?: BaseSectionTypeWithFolders<BaseSectionType>,
    ) => void
  : (item: ItemType) => void;

export type TitleListItemProps = Omit<ListItemProps, 'type'> & {
  type: 'title';
};

export type ItemPickerListAPI = {
  reloadActiveSection: () => void;
  currentSection:
    | BaseSectionType
    | BaseSectionTypeWithFolders<BaseSectionType>
    | undefined;
  activeSectionId: string | undefined;
};

export type ItemPickerListRef = Ref<ItemPickerListAPI | null>;

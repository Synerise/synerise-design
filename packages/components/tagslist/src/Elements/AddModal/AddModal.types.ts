import * as React from 'react';
import { TagsListItem, TagsListTexts } from '../../TagsList.types';

export type AddModalProps = {
  disabled: boolean;
  items?: TagsListItem[];
  hideItems?: [string | number];
  texts?: TagsListTexts;
  loading?: boolean;
  tristate?: boolean;
  trigger?: React.ReactNode;
  searchAddTag?: boolean;
  onItemsAdd?: (items: TagsListItem[]) => void;
  onVisibleChange?: (visible: boolean) => void;
  onManageTags?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

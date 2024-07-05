import { ReactNode, MouseEvent as ReactMouseEvent } from 'react';
import { TagsListItem, TagsListTexts } from '../../TagsList.types';

export type AddModalProps = {
  disabled?: boolean;
  items?: TagsListItem[];
  texts?: TagsListTexts;
  loading?: boolean;
  tristate?: boolean;
  trigger?: ReactNode;
  searchAddTag?: boolean;
  onItemsAdd?: (items: TagsListItem[]) => void;
  onVisibleChange?: (visible: boolean) => void;
  onManageTags?: (event: ReactMouseEvent<HTMLElement, MouseEvent>) => void;
};

import { ReactElement } from 'react';
import { TagsListItem, TagsListTexts, TagVisibility } from '../../TagsList.types';

export type ItemProps = {
  item: TagsListItem;
  texts: TagsListTexts | undefined;
  active?: boolean;
  checked?: boolean;
  withCheckbox?: boolean;
  toggleDeleteModal?: () => void;
  onEdit?: (item: TagsListItem) => void;
  onDelete?: (item: TagsListItem) => void;
  onFavourite?: (item: TagsListItem) => void;
  onVisibility?: (visibility: TagVisibility, item: TagsListItem) => void;
  onSettingsEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onItemSelect?: (item: TagsListItem) => void;
  icon?: ReactElement;
  iconFavourite?: ReactElement;
  iconFavouriteFlat?: ReactElement;
  rootPrefixCls?: string;
};

import { ReactElement } from 'react';
import { TagsListItem, TagsListProps, TagsListTexts, TagVisibility } from '../../TagsList.types';

export type ItemProps = {
  item: TagsListItem;
  texts: TagsListTexts;
  checked?: boolean;
  withCheckbox?: boolean;
  toggleDeleteModal?: () => void;
  onEdit?: (item: TagsListItem) => void;
  onDelete?: (item: TagsListItem) => void;
  onFavourite?: (item: TagsListItem) => void;
  onVisibility?: (visibility : TagVisibility, item?: TagsListItem) => void;
  onSettingsEnter?: (item?: TagsListItem) => void;
  onItemSelect?: (item: TagsListItem) => void;
  icon?: ReactElement;
  iconFavourite?: ReactElement;
  iconFavouriteFlat?: ReactElement;
} & Pick<TagsListProps, 'actionsDisplay'>;

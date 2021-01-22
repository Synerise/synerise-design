import { TagsListItem, TagsListTexts } from '../../TagsList.types';

export type ActionProps = {
  isFavourite?: boolean;
  dropdownMouseOver?: () => void;
  dropdownMouseOut?: () => void;
  onDelete?: (item?: TagsListItem) => void;
  onEdit?: (item?: TagsListItem) => void;
  onSettingsEnter?: (item?: TagsListItem) => void;
  onFavourite?: (item?: TagsListItem) => void;
  texts: TagsListTexts;
  hovered?: boolean;
};

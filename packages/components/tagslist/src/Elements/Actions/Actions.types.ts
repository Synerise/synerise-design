import { TagsListItem, TagsListTexts, TagVisibility } from '../../TagsList.types';

export type ActionProps = {
  isFavourite?: boolean;
  dropdownMouseOver?: () => void;
  dropdownMouseOut?: () => void;
  item: TagsListItem;
  onDelete?: (item?: TagsListItem) => void;
  onEdit?: (item?: TagsListItem) => void;
  onSettingsEnter?: (item?: TagsListItem) => void;
  onFavourite?: (item?: TagsListItem) => void;
  onVisibility?: (visibility : TagVisibility, item?: TagsListItem) => void;
  visibility?: TagVisibility;
  texts: TagsListTexts;
  hovered?: boolean;
};

export type VisibilityProps = {
  texts: TagsListTexts;
  item: TagsListItem;
  onVisibility?: (visibility : TagVisibility, item?: TagsListItem) => void;
  visibility?: TagVisibility;
};
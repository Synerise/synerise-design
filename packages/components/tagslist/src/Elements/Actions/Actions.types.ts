import { TagsListItem, TagsListTexts, TagVisibility } from '../../TagsList.types';

export type ActionProps = {
  dropdownMouseOver?: () => void;
  dropdownMouseOut?: () => void;
  item: TagsListItem;
  onDelete?: (item: TagsListItem) => void;
  onEdit?: (item?: TagsListItem) => void;
  onSettingsEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent> | Event) => void;
  onFavouriteChange?: (item?: TagsListItem) => void;
  onVisibilityChange?: (visibility: TagVisibility, item: TagsListItem) => void;
  onDropdownToggle?: (visible: boolean) => void;
  texts?: TagsListTexts;
  hovered?: boolean;
  favourite?: boolean;
  visible?: boolean;
};

export type VisibilityProps = {
  texts?: TagsListTexts;
  item: TagsListItem;
  onVisibilityChange?: (visibility: TagVisibility, item: TagsListItem) => void;
  visibility?: TagVisibility;
};

import { TagsListItem, TagsListTexts, TagVisibility } from '../../TagsList.types';

export type ActionProps = {
  isFavourite?: boolean;
  dropdownMouseOver?: () => void;
  dropdownMouseOut?: () => void;
  item: TagsListItem;
  onDelete?: (item: TagsListItem) => void;
  onEdit?: (item?: TagsListItem) => void;
  onSettingsEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onFavourite?: (item?: TagsListItem) => void;
  onVisibility?: (visibility: TagVisibility, item: TagsListItem) => void;
  onDropdown?: (visible: boolean) => void;
  visibility?: TagVisibility;
  texts: TagsListTexts | undefined;
  hovered?: boolean;
};

export type VisibilityProps = {
  texts: TagsListTexts | undefined;
  item: TagsListItem;
  onVisibility?: (visibility: TagVisibility, item: TagsListItem) => void;
  visibility?: TagVisibility;
};

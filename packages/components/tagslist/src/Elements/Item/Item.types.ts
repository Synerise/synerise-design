import { TagsListItem, TagsListProps, TagsListTexts } from '../../TagsList.types';

export type ItemProps = {
  item: TagsListItem;
  toggleDeleteModal?: () => void;
  onEdit?: (item: TagsListItem) => void;
  onDelete?: (item: TagsListItem) => void;
  onFavourite?: (item: TagsListItem) => void;
  onSettingsEnter?: (item?: TagsListItem) => void;
  onItemSelect?: (item: TagsListItem) => void;
  texts: TagsListTexts;
} & Pick<TagsListProps, 'actionsDisplay'>;

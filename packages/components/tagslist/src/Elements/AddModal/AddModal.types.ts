import { TagsListItem, TagsListTexts } from '../../TagsList.types';

export type Props = {
  onItemAdd?: (addParams: TagsListItem) => void;
  disabled: boolean;
  texts: TagsListTexts;
};

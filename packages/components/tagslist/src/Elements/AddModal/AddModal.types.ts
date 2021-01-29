import { TagsListItem, TagsListTexts } from '../../TagsList.types';

export type AddModalProps = {
  onItemAdd?: (addParams: TagsListItem) => void;
  disabled: boolean;
  texts: TagsListTexts | undefined;
  tristate?: boolean;
};

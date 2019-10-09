import { CSSProperties } from 'react';
import { Props as TagProps } from './Tag/Tag.types';
import { TagShape } from './Tag/Tag';

export interface TagsTexts {
  addButtonLabel?: string;
  searchPlaceholder?: string;
  manageLinkLabel?: string;
  createTagButtonLabel?: string;
  dropdownNoTags?: string;
}

export interface Props {
  data?: Array<TagProps>;
  selected?: Array<TagProps>;
  tagShape?: TagShape;
  className?: string;
  style?: CSSProperties;
  addable?: boolean;
  removable?: boolean;
  creatable?: boolean;
  disabled?: boolean;
  manageLink?: string;
  texts?: TagsTexts;
  onCreate?: (name: string) => void;
  onSelectedChange?: (tags: Array<TagProps>) => void;
}

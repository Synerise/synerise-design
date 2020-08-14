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

export interface ActionTaken {
  type: 'ADD' | 'REMOVE';
  tag: TagProps;
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
  theme: { [k: string]: string };
  onCreate?: (name: string) => void;
  onSelectedChange?: (tags: Array<TagProps>, action: ActionTaken) => void;
  overlayStyle?: React.CSSProperties;
  maxHeight?: number;
  overlayPlacement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
}

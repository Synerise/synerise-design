import { CSSProperties } from 'react';
import { Props as TagProps } from './Tag/Tag.types';
import { TagShape } from './Tag/Tag';

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
  texts?: {
    addButtonLabel?: string;
  };
  onSelectedChange?: (tags: Array<TagProps>) => void;
}

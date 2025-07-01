import type { CSSProperties } from 'react';

import { type TagProps, type TagShape, type TagTexts } from '@synerise/ds-tag';

export type ActionTaken = {
  type: 'ADD' | 'REMOVE';
  tag: TagProps;
};

export type TagsProps = {
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
  texts?: TagTexts;

  /**
   * @deprecated deprecated in favour of useTheme hook
   */
  theme?: { [k: string]: string };
  onCreate?: (name: string) => void;
  onSelectedChange?: (tags: Array<TagProps>, action: ActionTaken) => void;
  overlayStyle?: CSSProperties;
  maxHeight?: number;
  overlayPlacement?:
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight';
  asPill?: boolean;
  onManageTagClick?: () => void;
};

/**
 *  @deprecated - use TagsProps instead
 */
export type Props = TagsProps;

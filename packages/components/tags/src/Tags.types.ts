import type { CSSProperties, ReactNode } from 'react';

import { type InformationCardProps } from '@synerise/ds-information-card';
import { type TagProps, type TagShape, type TagTexts } from '@synerise/ds-tag';

export type ActionTaken = {
  type: 'ADD' | 'REMOVE';
  tag: TagProps;
};

export type ExtendedTagProps = TagProps & {
  informationCardProps?: InformationCardProps;
};

export type TagsProps = {
  data?: ExtendedTagProps[];
  selected?: ExtendedTagProps[];
  tagShape?: TagShape;
  className?: string;
  style?: CSSProperties;
  addable?: boolean;
  addButtonType?: 'single-icon' | 'icon-label';
  title?: ReactNode;
  removable?: boolean;
  creatable?: boolean;
  disabled?: boolean;
  texts?: Partial<TagTexts>;

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
  dropdownFooter?: ReactNode;
  maxVisibleTags?: number;
};

/**
 *  @deprecated - use TagsProps instead
 */
export type Props = TagsProps;

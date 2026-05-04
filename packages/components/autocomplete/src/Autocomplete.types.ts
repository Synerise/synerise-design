import {
  type AutoCompleteProps as OriginalProps,
  type RefSelectProps,
} from 'antd';
import type { MutableRefObject, ReactNode } from 'react';

import type { FormFieldCommonProps } from '@synerise/ds-form-field';
import type { AutoResizeProp } from '@synerise/ds-input';

export type OverrideProps = FormFieldCommonProps & {
  className?: string;
  icon1?: ReactNode;
  icon1Tooltip?: ReactNode;
  icon2?: ReactNode;
  icon2Tooltip?: ReactNode;
  error?: boolean;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  readOnly?: boolean;
  handleInputRef?: (ref: MutableRefObject<RefSelectProps | null>) => void;
  autoResize?: AutoResizeProp;
};

export type AutocompleteProps = OverrideProps &
  Omit<
    OriginalProps,
    | 'tagRender'
    | 'fieldNames'
    | 'filterSort'
    | 'filterOption'
    | 'tokenSeparators'
    | 'transitionName'
    | 'showArrow'
    | 'animation'
    | 'searchValue'
    | 'showArrow'
    | 'listItemHeight'
    | 'menuItemSelectedIcon'
    | 'maxTagCount'
    | 'maxTagPlaceholder'
    | 'maxTagTextLength'
    | 'fieldNames'
    | 'filterOption'
    | 'backfill'
    | 'bordered'
    | 'choiceTransitionName'
    | 'showSearch'
  >;

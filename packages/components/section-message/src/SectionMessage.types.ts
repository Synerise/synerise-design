import type { ReactElement, ReactNode } from 'react';

import type { WithHTMLAttributes } from '@synerise/ds-utils';

import { type SECTION_TYPES } from './SectionMessage.const';

export type CustomColorType =
  | 'blue'
  | 'grey'
  | 'red'
  | 'green'
  | 'yellow'
  | 'pink'
  | 'mars'
  | 'orange'
  | 'fern'
  | 'cyan'
  | 'purple'
  | 'violet';

/** @deprecated */
export type ColorType =
  | 'grey'
  | 'red'
  | 'green'
  | 'yellow'
  | 'violet'
  | 'purple'
  | 'cyan';

export type SectionType = (typeof SECTION_TYPES)[number];

export type SectionMessageProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    message?: ReactNode;
    type: SectionType;
    customColor?: CustomColorType;
    customColorIcon?: CustomColorType;
    description?: ReactNode;
    showMoreLabel?: ReactNode;
    onShowMore?: () => void;
    onClose?: () => void;
    suffixel?: ReactNode;
    moreButtons?: ReactNode;
    withEmphasis?: ReactNode;
    withLink?: ReactNode;
    unorderedList?: ReactNode;
    withClose?: ReactNode;
    customIcon?: ReactElement;
    /** @deprecated - color is defined by type, use customColor property if you need to voerwrite it */
    color?: ColorType;
    icon?: ReactNode;
  }
>;

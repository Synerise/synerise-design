import type { ReactElement, ReactNode } from 'react';

import type { WithHTMLAttributes } from '@synerise/ds-utils';

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
export type ColorType =
  | 'grey'
  | 'red'
  | 'green'
  | 'yellow'
  | 'violet'
  | 'purple'
  | 'cyan';

export type SectionType =
  | 'positive'
  | 'notice'
  | 'negative'
  | 'neutral'
  | 'supply'
  | 'service'
  | 'entity';

export type SectionMessageProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    message?: ReactNode;
    type: string | SectionType;
    customColor?: CustomColorType;
    customColorIcon?: CustomColorType;
    color?: ColorType;
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
    icon?: ReactNode;
  }
>;

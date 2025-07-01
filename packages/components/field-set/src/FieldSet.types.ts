import { type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';

import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type FieldSetProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    component?: ReactNode;
    prefix?: ReactNode;
    title?: ReactNode;
    description?: ReactNode;
    button?: ReactNode;
    onTitleClick?: (ev: ReactMouseEvent<HTMLElement, MouseEvent>) => void;
    className?: string;
    divider?: boolean;
    expandable?: boolean;
    defaultExpanded?: boolean;
  }
>;

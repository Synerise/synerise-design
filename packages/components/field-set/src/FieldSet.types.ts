import { WithHTMLAttributes } from '@synerise/ds-utils';
import { ReactNode, MouseEvent as ReactMouseEvent } from 'react';

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

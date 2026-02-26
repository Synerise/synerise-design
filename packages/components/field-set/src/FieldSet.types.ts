import { type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';

import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type TriggerType = 'expander' | 'switch';

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
    triggerType?: TriggerType;
    defaultExpanded?: boolean;
    onExpandChange?: (expanded: boolean) => void;
  }
>;

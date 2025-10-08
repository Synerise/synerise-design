import { type ReactNode } from 'react';

import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type HeaderProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    text?: ReactNode;
    children?: ReactNode;
    tooltip?: string;
  }
>;

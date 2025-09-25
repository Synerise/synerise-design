import { type ReactNode } from 'react';

import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type CardGroupProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    children: ReactNode;
    columns: number;
  }
>;

import { ReactNode } from 'react';
import { ExactlyOne, WithHTMLAttributes } from '@synerise/ds-utils';

export type ShortCutsProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    size?: 'S' | 'L';
    color?: 'light' | 'dark';
    autoWidth?: boolean;
  }
> &
  ExactlyOne<{ icon?: ReactNode }, { children?: ReactNode }>;

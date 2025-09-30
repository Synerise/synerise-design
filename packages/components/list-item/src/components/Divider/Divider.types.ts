import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type DividerProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    higher?: boolean;
    level?: number;
  }
>;

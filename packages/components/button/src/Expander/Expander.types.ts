import type { MouseEvent } from 'react';

export const ExpanderSize: Record<'S' | 'M', number> = {
  S: 24,
  M: 32,
};

export type ExpanderProps = {
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  size?: 'S' | 'M';
  disabled?: boolean;
  expanded?: boolean;
  className?: string;
};

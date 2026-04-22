import { type CSSProperties, type ReactNode, type UIEvent } from 'react';

import { type ScrollBarProps } from '@ofsajd/react-perfect-scrollbar';

export type OverscrollBehavior = 'contain' | 'auto' | 'none';
export type ScrollbarAdditionalProps = {
  absolute?: boolean;
  classes?: string;
  className?: string;
  hasMore?: boolean;
  loading?: boolean;
  maxHeight?: string | number;
  largeSize?: boolean;
  style?: CSSProperties;
  fetchData?: () => void;
  onScroll?: (event: UIEvent) => void;
  onYReachEnd?: () => void;
  withDnd?: boolean;
  confineScroll?: boolean;
  overscrollBehavior?: OverscrollBehavior;
};

export type ScrollbarProps = ScrollbarAdditionalProps & {
  children?: ReactNode;
};

export type VirtualScrollbarProps = ScrollbarProps & {
  scrollbarOptions?: ScrollBarProps['options'];
};

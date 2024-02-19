import * as React from 'react';
import { ScrollBarProps } from 'react-perfect-scrollbar';

export type ScrollbarAdditionalProps = {
  absolute?: boolean;
  classes?: string;
  className?: string;
  hasMore?: boolean;
  loading?: boolean;
  maxHeight?: string | number;
  largeSize?: boolean;
  style?: React.CSSProperties;
  fetchData?: () => void;
  onScroll?: (e: React.UIEvent) => void;
  onYReachEnd?: () => void;
  withDnd?: boolean;
};

export type ScrollbarProps = ScrollbarAdditionalProps & {
  children: React.ReactNode | string;
};

export type VirtualScrollbarProps = ScrollbarProps & {
  scrollbarOptions?: ScrollBarProps['options'];
};

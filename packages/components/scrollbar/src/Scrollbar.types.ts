import * as React from 'react';
import { ScrollBarProps } from 'react-perfect-scrollbar';

export type ScrollbarProps = {
  absolute?: boolean;
  children: React.ReactNode | string;
  classes?: string;
  hasMore?: boolean;
  loading?: boolean;
  maxHeight?: string | number;
  style?: React.CSSProperties;
  fetchData?: () => void;
  onScroll?: (e: React.UIEvent) => void;
  onYReachEnd?: ScrollBarProps['onYReachEnd'];
};

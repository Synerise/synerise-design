import * as React from 'react';

export type ScrollbarProps = {
  children: React.ReactNode | string;
  classes?: string;
  maxHeight?: string | number;
  absolute?: boolean;
  onScroll?: (e: React.UIEvent) => void;
  loading?: boolean;
  hasMore?: boolean;
  fetchData?: () => void;
  style?: React.CSSProperties;
};

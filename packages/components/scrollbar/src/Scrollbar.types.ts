import * as React from 'react';

export type ScrollbarAdditionalProps = {
  absolute?: boolean;
  classes?: string;
  className?: string;
  hasMore?: boolean;
  loading?: boolean;
  maxHeight?: string | number;
  style?: React.CSSProperties;
  fetchData?: () => void;
  onScroll?: (e: React.UIEvent) => void;
  onYReachEnd?: () => void;
  withDnd?: boolean;
};

export type ScrollbarProps = ScrollbarAdditionalProps & {
  children: React.ReactNode | string;
};

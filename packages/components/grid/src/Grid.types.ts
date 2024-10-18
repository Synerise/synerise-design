import type { ReactNode } from 'react';

export type GridProps = {
  gutter?: number;
  style?: CSSStyleRule;
  children?: React.ReactNode | React.ReactNode[];
};

export type GridItemProps = {
  contentWrapper?: boolean;
  children?: ReactNode;
  xxl?: number;
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
};

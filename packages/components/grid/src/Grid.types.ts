import * as React from 'react';

export type GridProps = {
  gutter?: number;
  style?: CSSStyleRule;
  children?: React.ReactNode | React.ReactNode[];
};

export type GridItemProps = {
  contentWrapper?: boolean;
  xxl?: number;
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
};

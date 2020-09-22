import * as React from 'react';

export type GridProps = {
  gutter?: number;
  children?: JSX.Element[] | React.ReactChildren | React.ReactNode[];
};

export type GridItemProps = {
  xxl?: number;
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
};

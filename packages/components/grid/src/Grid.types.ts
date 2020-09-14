import * as React from 'react';

export type GridProps = {
  children: React.ReactChildren | Element[];
  gutter?: number;
};

export type GridItemProps = {
  children: React.ReactChildren;
  xxl?: number;
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
};

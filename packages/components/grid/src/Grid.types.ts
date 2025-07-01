import { type CSSProperties, type ReactNode } from 'react';

export type GridProps = {
  gutter?: number;
  style?: CSSProperties;
  children?: ReactNode | ReactNode[];
};

export type GridItemProps = {
  children?: ReactNode | ReactNode[];
  contentWrapper?: boolean;
  xxl?: number;
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
};

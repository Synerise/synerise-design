import * as React from 'react';

export enum LoaderSize {
  'S' = 12,
  'M' = 20,
  'L' = 40,
}
export type LoaderProps = {
  size?: 'S' | 'M' | 'L';
  label: string | React.ReactNode;
  labelPosition?: 'bottom' | 'right';
  percent?: number | React.ReactNode;
  percentFormatter?: (percent?: number | React.ReactNode) => React.ReactNode;
  color?:
    | string
    | 'blue'
    | 'grey'
    | 'red'
    | 'green'
    | 'yellow'
    | 'pink'
    | 'mars'
    | 'orange'
    | 'fern'
    | 'cyan'
    | 'purple'
    | 'violet';
};

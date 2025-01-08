import type { ReactNode } from 'react';

export type ProgressTilesProps = {
  tileWidth: string;
  colors: string[];
  percent: number;
  label?: ReactNode;
};

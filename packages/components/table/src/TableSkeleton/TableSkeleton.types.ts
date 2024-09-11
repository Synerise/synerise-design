import { HTMLAttributes } from 'react';

export type TableSkeletonProps = HTMLAttributes<HTMLDivElement> & {
  maxHeight?: number;
  headerHeight?: number;
  subheaderHeight?: number;
  rowHeight?: number;
};

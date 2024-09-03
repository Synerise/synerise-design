import { HTMLAttributes } from 'react';

export type TableSkeletonProps = HTMLAttributes<HTMLDivElement> & {
  maxHeight?: number;
};

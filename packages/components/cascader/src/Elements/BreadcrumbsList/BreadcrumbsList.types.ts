import type { ReactText } from 'react';
import type { Path } from '../../Cascader.types';

export type BreadcrumbsListProps = {
  paths: Path[];
  width: number | string;
  rowHeight?: number;
  visibleRows?: number;
  highlight?: string;
  onBreadCrumbClick?: (breadcrumb: Path) => void;
  scrollTop: number;
  selectedIds: ReactText[];
};

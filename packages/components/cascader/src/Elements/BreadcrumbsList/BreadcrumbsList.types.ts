import { Path } from '../../Cascader.types';

export interface BreadcrumbsListProps {
  paths: Path[];
  width: number | string;
  rowHeight?: number;
  visibleRows?: number;
  highlight?: string;
  onBreadCrumbClick?: (breadcrumb: Path) => void;
  scrollTop: number;
}

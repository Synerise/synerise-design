import * as React from 'react';
import Menu from '@synerise/ds-menu';
import { Path } from 'Cascader.types';
import { renderSearchList } from '@synerise/ds-search/dist/Elements/SearchItems/SearchItems';

const DEFAULT_VISIBLE_ROWS = 6;
const DEFAULT_ROW_HEIGHT = 50;
export interface BreadcrumbsListProps {
  paths: Path[];
  width: number;
  rowHeight?: number;
  visibleRows?: number;
  highlight?: string;
  onBreadCrumbClick?: (breadcrumb: Path) => void;
  scrollTop: number;
}

const BreadcrumbsList: React.FC<BreadcrumbsListProps> = ({
  paths,
  highlight,
  width,
  visibleRows,
  onBreadCrumbClick,
  rowHeight,
  scrollTop,
}) => {
  const listPropsObject = { scrollTop };
  return renderSearchList<Path>({
    data: paths,
    visibleRows: visibleRows || DEFAULT_VISIBLE_ROWS,
    highlight,
    width,
    rowHeight: rowHeight || DEFAULT_ROW_HEIGHT,
    onItemClick: onBreadCrumbClick,
    itemRender: (item: Path): React.ReactElement => (
      <Menu.Breadcrumb
        gradientOverlap
        compact
        path={item.path}
        key={`${item.id}`}
        description={item.path[item.path.length - 1]}
        highlight={highlight}
      />
    ),
    listProps: listPropsObject,
  });
};

export default BreadcrumbsList;

import React from 'react';
import { renderSearchList } from '@synerise/ds-search/dist/Elements/SearchItems/SearchItems';
import { Path } from '../../Cascader.types';
import { BreadcrumbsListProps } from './BreadcrumbsList.types';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

const DEFAULT_VISIBLE_ROWS = 6;
const DEFAULT_ROW_HEIGHT = 50;

export const BreadcrumbsList = ({
  paths,
  highlight,
  width,
  visibleRows,
  onBreadCrumbClick,
  rowHeight,
  scrollTop,
}: BreadcrumbsListProps) => {
  const listPropsObject = { scrollTop };
  return renderSearchList<Path>({
    data: paths,
    visibleRows: visibleRows || DEFAULT_VISIBLE_ROWS,
    highlight,
    width,
    rowHeight: rowHeight || DEFAULT_ROW_HEIGHT,
    onItemClick: onBreadCrumbClick,
    itemRender: (item: Path) => (
      <Breadcrumb
        gradientOverlap
        compact
        path={item.path}
        key={`${item.id}`}
        description={item.path[item.path.length - 1]}
        highlight={highlight}
        onClick={() => onBreadCrumbClick && onBreadCrumbClick(item)}
      />
    ),
    listProps: listPropsObject,
  });
};

export default BreadcrumbsList;

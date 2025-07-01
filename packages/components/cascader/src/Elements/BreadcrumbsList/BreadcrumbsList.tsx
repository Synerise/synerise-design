import React from 'react';

import { theme } from '@synerise/ds-core';
import Icon, { CheckS } from '@synerise/ds-icon';
import { renderSearchList } from '@synerise/ds-search/dist/Elements/SearchItems/SearchItems';

import { type Path } from '../../Cascader.types';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { type BreadcrumbsListProps } from './BreadcrumbsList.types';

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
  selectedIds,
}: BreadcrumbsListProps) => {
  const listPropsObject = { scrollTop };
  return renderSearchList<Path>({
    data: paths,
    visibleRows: visibleRows || DEFAULT_VISIBLE_ROWS,
    highlight,
    width,
    rowHeight: rowHeight || DEFAULT_ROW_HEIGHT,
    onItemClick: onBreadCrumbClick,
    itemRender: (item: Path) => {
      const tickIcon = (
        <div>
          <Icon color={theme.palette['green-600']} component={<CheckS />} />
        </div>
      );
      return (
        <Breadcrumb
          gradientOverlap
          compact
          path={item.path}
          key={`${item.id}`}
          suffixel={selectedIds.includes(item.id) ? tickIcon : undefined}
          description={item.path[item.path.length - 1]}
          highlight={highlight}
        />
      );
    },
    listProps: listPropsObject,
  });
};

export default BreadcrumbsList;

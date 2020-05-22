import * as React from 'react';
import Menu from '@synerise/ds-menu';
import { Path } from 'Cascader.types';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import { renderSearchList } from '@synerise/ds-search/dist/Elements/SearchItems/SearchItems';

export interface BreadcrumbsListProps {
  paths: Path[];
  highlight?: string;
  onBreadCrumbClick: (breadcrumb: Path | MenuItemProps) => void;
}

const BreadcrumbsList: React.FC<BreadcrumbsListProps> = ({ paths, highlight, onBreadCrumbClick }) => {
  return renderSearchList<Path>({
    data: paths,
    width: 282,
    rowHeight: 50,
    visibleRows: 6,
    highlight,
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
  });
};

export default BreadcrumbsList;

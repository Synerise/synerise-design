import * as React from 'react';
import Menu from '@synerise/ds-menu';
import { Path } from 'Cascader.types';
import { SearchItemList } from '@synerise/ds-search/dist/Elements';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';

export interface BreadcrumbsListProps {
  paths: Path[];
  highlight?: string;
  onBreadCrumbClick: (breadcrumb: Path | MenuItemProps) => void;
}
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore-start
const BreadcrumbsList: React.FC<BreadcrumbsListProps> = ({ paths, highlight, onBreadCrumbClick }) => {
  return (
    <SearchItemList
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      data={paths}
      width={282}
      rowHeight={50}
      visibleRows={6}
      highlight={highlight}
      onItemClick={onBreadCrumbClick}
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      itemRender={(item: Path & MenuItemProps, index: number): React.ReactNode => (
        <Menu.Breadcrumb
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          gradientOverlap
          compact
          path={item.path}
          key={`${index}-${item.id}`}
          description={item.path[item.path.length - 1]}
          highlight={highlight}
        />
      )}
    />
  );
};

export default BreadcrumbsList;

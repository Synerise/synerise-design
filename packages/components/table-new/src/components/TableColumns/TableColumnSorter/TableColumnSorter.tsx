import React, { type MouseEvent, useMemo, useState } from 'react';

import {
  DropdownMenu,
  type DropdownMenuListItemProps,
} from '@synerise/ds-dropdown';
import Icon, {
  Close2M,
  SortAscendingM,
  SortAzM,
  SortDescendingM,
  SortZaM,
} from '@synerise/ds-icon';

import { type TableColumnSorterProps } from '../../../Table.types';
import { getSortOrder } from '../../../utils/sort';
import { DefaultSortIcon } from './SortIcons/DefaultSortIcon';
import { StringSortIcon } from './SortIcons/StringSortIcon';
import { ASCENDING, DESCENDING } from './TableColumnSorter.const';
import * as S from './TableColumnSorter.styles';

const stopPropagation = (event: MouseEvent) => event.stopPropagation();

export const TableColumnSorter = <TData extends object, TValue>({
  column,
  texts,
}: TableColumnSorterProps<TData, TValue>) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const sortOrder = getSortOrder(column);

  const isStringSorter = column.columnDef.meta?.sortRender === 'string';

  const {
    IconAscending,
    IconDescending,
    IconTrigger,
    ascendingLabel,
    descendingLabel,
  } = useMemo(
    () =>
      isStringSorter
        ? {
            IconAscending: SortAzM,
            IconDescending: SortZaM,
            IconTrigger: StringSortIcon,
            ascendingLabel: texts.columnSortAz,
            descendingLabel: texts.columnSortZa,
          }
        : {
            IconAscending: SortAscendingM,
            IconDescending: SortDescendingM,
            IconTrigger: DefaultSortIcon,
            ascendingLabel: texts.columnSortAscend,
            descendingLabel: texts.columnSortDescend,
          },
    [
      isStringSorter,
      texts.columnSortAscend,
      texts.columnSortAz,
      texts.columnSortDescend,
      texts.columnSortZa,
    ],
  );

  const dropdownDataSource: DropdownMenuListItemProps[] = [
    {
      onClick: () =>
        // TODO - use column.columnDef.meta.multipleSortingOrder to manage multisort
        // currently it will prioritise last column sorted
        column.toggleSorting(!ASCENDING, column.columnDef.enableMultiSort),
      prefixel: <Icon component={<IconAscending />} />,
      selected: sortOrder === ASCENDING,
      text: ascendingLabel,
    },

    {
      key: DESCENDING,
      prefixel: <Icon component={<IconDescending />} />,
      selected: sortOrder === DESCENDING,
      onClick: () =>
        // TODO - use column.columnDef.meta.multipleSortingOrder to manage multisort
        // currently it will prioritise last column sorted
        column.toggleSorting(!!ASCENDING, column.columnDef.enableMultiSort),
      text: descendingLabel,
    },
  ];
  if (sortOrder) {
    dropdownDataSource.push({
      type: 'danger',
      prefixel: <Icon component={<Close2M />} />,
      text: texts.columnSortClear,
      onClick: () => column.clearSorting(),
    });
  }

  return (
    <div onClick={stopPropagation}>
      <DropdownMenu
        dataSource={dropdownDataSource}
        onOpenChange={(isVisible: boolean) => {
          if (isVisible !== isDropdownVisible) {
            setIsDropdownVisible(isVisible);
          }
        }}
        open={isDropdownVisible}
        popoverProps={{
          testId: 'table-sort-common',
        }}
      >
        <S.ToggleButton
          isVisible={isDropdownVisible}
          type="ghost"
          mode="single-icon"
          className="ds-sort-dropdown-button"
          data-testid={`table-${isStringSorter ? 'string' : 'common'}-sorter-button`}
        >
          <IconTrigger sortDirection={sortOrder} />
        </S.ToggleButton>
      </DropdownMenu>
    </div>
  );
};

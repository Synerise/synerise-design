import { partial } from 'lodash';
import React, {
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  useState,
} from 'react';

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
import { type ItemData } from '@synerise/ds-list-item';

import {
  type DSColumnType,
  type OnSortFn,
  type SortStateAPI,
} from '../Table.types';
import { useTableLocaleContext } from '../utils/locale';
import { DefaultSortIcon, StringSortIcon } from './SortIcons';
import * as S from './SortRender.styles';
import { toSortOrder } from './useSortState';

type SortRendererProps<T> = {
  sortStateApi: SortStateAPI;
  column: DSColumnType<T>;
  onSort?: OnSortFn;
};

const handleButtonClick = (event: ReactMouseEvent<HTMLElement, MouseEvent>) => {
  event.stopPropagation();
};

export const CommonRenderer = <T,>({
  column,
  sortStateApi,
}: SortRendererProps<T>) => {
  const { getColumnSortOrder, setColumnSortOrder } = sortStateApi;
  const columnKey = String(column.key);
  const columnSortOrder = column.key ? getColumnSortOrder(columnKey) : null;
  const onSortOrderChange = partial(setColumnSortOrder, columnKey);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const locale = useTableLocaleContext();
  const handleClick = ({ key }: ItemData<ReactMouseEvent | KeyboardEvent>) => {
    onSortOrderChange(toSortOrder(String(key)));
  };

  const dropdownDataSource: DropdownMenuListItemProps[] = [
    {
      key: 'ascend',
      onClick: handleClick,
      prefixel: <Icon component={<SortAscendingM />} />,
      selected: columnSortOrder === 'ascend',
      text: locale.columnSortAscend,
    },

    {
      key: 'descend',
      prefixel: <Icon component={<SortDescendingM />} />,
      selected: columnSortOrder === 'descend',
      onClick: handleClick,
      text: locale.columnSortDescend,
    },
  ];
  if (columnSortOrder) {
    dropdownDataSource.push({
      key: 'null',
      type: 'danger',
      prefixel: <Icon component={<Close2M />} />,
      text: locale.columnSortClear,
      onClick: handleClick,
    });
  }
  return (
    <div onClick={handleButtonClick}>
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
          data-testid="table-common-sorter-button"
        >
          <DefaultSortIcon sortOrder={columnSortOrder} />
        </S.ToggleButton>
      </DropdownMenu>
    </div>
  );
};

export const StringRenderer = <T,>({
  column,
  sortStateApi,
}: SortRendererProps<T>) => {
  const { getColumnSortOrder, setColumnSortOrder } = sortStateApi;
  const columnKey = String(column.key);
  const columnSortOrder = column.key ? getColumnSortOrder(columnKey) : null;
  const onSortOrderChange = partial(setColumnSortOrder, columnKey);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const locale = useTableLocaleContext();
  const handleClick = (data: ItemData<ReactMouseEvent | KeyboardEvent>) => {
    onSortOrderChange(toSortOrder(String(data.key)));
  };
  const dropdownDataSource: DropdownMenuListItemProps[] = [
    {
      key: 'ascend',
      prefixel: <Icon component={<SortAzM />} />,
      selected: columnSortOrder === 'ascend',
      text: locale.columnSortAz,
      onClick: handleClick,
    },
    {
      key: 'descend',
      prefixel: <Icon component={<SortZaM />} />,
      selected: columnSortOrder === 'descend',
      text: locale.columnSortZa,
      onClick: handleClick,
    },
  ];
  if (columnSortOrder) {
    dropdownDataSource.push({
      key: 'null',
      type: 'danger',
      prefixel: <Icon component={<Close2M />} />,
      text: locale.columnSortClear,
      onClick: handleClick,
    });
  }

  return (
    <div onClick={handleButtonClick}>
      <DropdownMenu
        onOpenChange={setIsDropdownVisible}
        open={isDropdownVisible}
        dataSource={dropdownDataSource}
        popoverProps={{
          testId: 'table-sort-string',
        }}
      >
        <S.ToggleButton
          isVisible={isDropdownVisible}
          type="ghost"
          mode="single-icon"
          className="ds-sort-dropdown-button"
          data-testid="table-string-sorter-button"
        >
          <StringSortIcon sortOrder={columnSortOrder} />
        </S.ToggleButton>
      </DropdownMenu>
    </div>
  );
};

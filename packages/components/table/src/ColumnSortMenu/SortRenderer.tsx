import { partial } from 'lodash';
import React, { type MouseEvent as ReactMouseEvent, useState } from 'react';

import Dropdown from '@synerise/ds-dropdown';
import Icon, {
  Close2M,
  SortAscendingM,
  SortAzM,
  SortDescendingM,
  SortZaM,
} from '@synerise/ds-icon';
import Menu, { type MenuItemProps } from '@synerise/ds-menu';

import { type DSColumnType, type OnSortFn } from '../Table.types';
import { useTableLocaleContext } from '../utils/locale';
import { CheckIcon, DefaultSortIcon, StringSortIcon } from './SortIcons';
import * as S from './SortRender.styles';
import { type SortStateAPI, toSortOrder } from './useSortState';

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
  const menuDataSource: MenuItemProps[] = [
    {
      key: 'ascend',
      prefixel: <Icon component={<SortAscendingM />} />,
      suffixel: <CheckIcon isActive={columnSortOrder === 'ascend'} />,
      text: locale.columnSortAscend,
    },

    {
      key: 'descend',
      prefixel: <Icon component={<SortDescendingM />} />,
      suffixel: <CheckIcon isActive={columnSortOrder === 'descend'} />,

      text: locale.columnSortDescend,
    },
  ];
  if (columnSortOrder) {
    menuDataSource.push({
      key: 'null',
      type: 'danger',
      prefixel: <Icon component={<Close2M />} />,
      text: locale.columnSortClear,
    });
  }
  return (
    <Dropdown
      onVisibleChange={(isVisible) => {
        if (isVisible !== isDropdownVisible) {
          setIsDropdownVisible(isVisible);
        }
      }}
      overlay={
        <Dropdown.Wrapper style={{ width: 220 }}>
          <Menu
            asDropdownMenu
            onClick={({ key }) => {
              onSortOrderChange(toSortOrder(String(key)));
            }}
            style={{ width: 220 }}
            dataSource={menuDataSource}
          />
        </Dropdown.Wrapper>
      }
    >
      <S.ToggleButton
        isVisible={isDropdownVisible}
        type="ghost"
        mode="single-icon"
        className="ds-sort-dropdown-button"
        onClick={handleButtonClick}
        data-testid="table-common-sorter-button"
      >
        <DefaultSortIcon sortOrder={columnSortOrder} />
      </S.ToggleButton>
    </Dropdown>
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
  const menuDataSource: MenuItemProps[] = [
    {
      key: 'ascend',
      prefixel: <Icon component={<SortAzM />} />,
      suffixel: <CheckIcon isActive={columnSortOrder === 'ascend'} />,
      text: locale.columnSortAz,
    },
    {
      key: 'descend',
      prefixel: <Icon component={<SortZaM />} />,
      suffixel: <CheckIcon isActive={columnSortOrder === 'descend'} />,
      text: locale.columnSortZa,
    },
  ];
  if (columnSortOrder) {
    menuDataSource.push({
      key: 'null',
      type: 'danger',
      prefixel: <Icon component={<Close2M />} />,
      text: locale.columnSortClear,
    });
  }

  return (
    <Dropdown
      onVisibleChange={(isVisible) => {
        if (isVisible !== isDropdownVisible) {
          setIsDropdownVisible(isVisible);
        }
      }}
      overlay={
        <Dropdown.Wrapper style={{ width: 170 }}>
          <Menu
            asDropdownMenu
            onClick={({ key }) => {
              onSortOrderChange(toSortOrder(String(key)));
            }}
            style={{ width: 170 }}
            dataSource={menuDataSource}
          />
        </Dropdown.Wrapper>
      }
    >
      <S.ToggleButton
        isVisible={isDropdownVisible}
        type="ghost"
        mode="single-icon"
        className="ds-sort-dropdown-button"
        onClick={handleButtonClick}
        data-testid="table-string-sorter-button"
      >
        <StringSortIcon sortOrder={columnSortOrder} />
      </S.ToggleButton>
    </Dropdown>
  );
};

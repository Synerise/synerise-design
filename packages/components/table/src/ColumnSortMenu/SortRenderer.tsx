import React, { useState, MouseEvent as ReactMouseEvent } from 'react';
import { partial } from 'lodash';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { Close2M, SortAscendingM, SortDescendingM, SortAzM, SortZaM } from '@synerise/ds-icon';
import Menu, { MenuItemProps } from '@synerise/ds-menu';
import { DSColumnType, OnSortFn } from '../Table.types';
import { useTableLocaleContext } from '../utils/locale';
import * as S from './SortRender.styles';
import { SortStateAPI, toSortOrder } from './useSortState';
import { CheckIcon, DefaultSortIcon, StringSortIcon } from './SortIcons';

type SortRendererProps<T> = {
  sortStateApi: SortStateAPI;
  column: DSColumnType<T>;
  onSort?: OnSortFn;
};

const handleButtonClick = (event: ReactMouseEvent<HTMLElement, MouseEvent>) => {
  event.stopPropagation();
};

export const CommonRenderer = <T extends unknown>({ column, sortStateApi }: SortRendererProps<T>) => {
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
      onVisibleChange={isVisible => {
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
      >
        <DefaultSortIcon sortOrder={columnSortOrder} />
      </S.ToggleButton>
    </Dropdown>
  );
};

export const StringRenderer = <T extends unknown>({ column, sortStateApi }: SortRendererProps<T>) => {
  const { getColumnSortOrder, setColumnSortOrder } = sortStateApi;
  const columnKey = String(column.key);
  const columnSortOrder = column.key ? getColumnSortOrder(columnKey) : null;
  const onSortOrderChange = partial(setColumnSortOrder, columnKey);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const locale = useTableLocaleContext();

  return (
    <Dropdown
      onVisibleChange={isVisible => {
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
          >
            <Menu.Item
              key="ascend"
              prefixel={<Icon component={<SortAzM />} />}
              suffixel={<CheckIcon isActive={columnSortOrder === 'ascend'} />}
            >
              {locale.columnSortAz}
            </Menu.Item>
            <Menu.Item
              key="descend"
              prefixel={<Icon component={<SortZaM />} />}
              suffixel={<CheckIcon isActive={columnSortOrder === 'descend'} />}
            >
              {locale.columnSortZa}
            </Menu.Item>
            {!!columnSortOrder && (
              <Menu.Item key="null" type="danger" prefixel={<Icon component={<Close2M />} />}>
                {locale.columnSortClear}
              </Menu.Item>
            )}
          </Menu>
        </Dropdown.Wrapper>
      }
    >
      <S.ToggleButton
        isVisible={isDropdownVisible}
        type="ghost"
        mode="single-icon"
        className="ds-sort-dropdown-button"
        onClick={handleButtonClick}
      >
        <StringSortIcon sortOrder={columnSortOrder} />
      </S.ToggleButton>
    </Dropdown>
  );
};

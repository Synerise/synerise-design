import { partial } from 'lodash';
import * as React from 'react';
import Button from '@synerise/ds-button';
import Dropdown from '@synerise/ds-dropdown';
import Icon from '@synerise/ds-icon';
import Menu from '@synerise/ds-menu';
import { Close2M, SortAscendingM, SortDescendingM, SortAzM, SortZaM } from '@synerise/ds-icon/dist/icons';
import { DSColumnType } from '../Table.types';
import { SortStateAPI, toSortOrder } from './useSortState';
import { CheckIcon, DefaultSortIcon, StringSortIcon } from './SortIcons';

interface SortRendererProps<T> {
  sortStateApi: SortStateAPI;
  column: DSColumnType<T>;
}

export const CommonRenderer = <T extends unknown>({
  column,
  sortStateApi,
}: SortRendererProps<T>): React.ReactElement => {
  const { getColumnSortOrder, setColumnSortOrder } = sortStateApi;
  const columnKey = String(column.key);
  const columnSortOrder = column.key ? getColumnSortOrder(columnKey) : null;
  const onSortOrderChange = partial(setColumnSortOrder, columnKey);

  return (
    <Dropdown
      overlay={
        <Dropdown.Wrapper>
          <Menu
            onClick={({ key }): void => {
              onSortOrderChange(toSortOrder(key));
            }}
            style={{ padding: 8 }}
          >
            {/* TODO: add translation */}
            <Menu.Item
              key="ascend"
              prefixel={<Icon component={<SortAscendingM />} />}
              suffixel={<CheckIcon isActive={columnSortOrder === 'ascend'} />}
            >
              Sort ascending
            </Menu.Item>
            {/* TODO: add translation */}
            <Menu.Item
              key="descend"
              prefixel={<Icon component={<SortDescendingM />} />}
              suffixel={<CheckIcon isActive={columnSortOrder === 'descend'} />}
            >
              Sort descending
            </Menu.Item>
            {/* TODO: add translation */}
            {!!columnSortOrder && (
              <Menu.Item key="null" prefixel={<Icon component={<Close2M />} color="red" />}>
                Clear
              </Menu.Item>
            )}
          </Menu>
        </Dropdown.Wrapper>
      }
    >
      <Button type="ghost" mode="single-icon">
        <DefaultSortIcon sortOrder={columnSortOrder} />
      </Button>
    </Dropdown>
  );
};

export const StringRenderer = <T extends unknown>({
  column,
  sortStateApi,
}: SortRendererProps<T>): React.ReactElement => {
  const { getColumnSortOrder, setColumnSortOrder } = sortStateApi;
  const columnKey = String(column.key);
  const columnSortOrder = column.key ? getColumnSortOrder(columnKey) : null;
  const onSortOrderChange = partial(setColumnSortOrder, columnKey);

  return (
    <Dropdown
      overlay={
        <Dropdown.Wrapper>
          <Menu
            onClick={({ key }): void => {
              onSortOrderChange(toSortOrder(key));
            }}
            style={{ padding: 8 }}
          >
            {/* TODO: add translation */}
            <Menu.Item
              key="ascend"
              prefixel={<Icon component={<SortAzM />} />}
              suffixel={<CheckIcon isActive={columnSortOrder === 'ascend'} />}
            >
              Sort a-z
            </Menu.Item>
            {/* TODO: add translation */}
            <Menu.Item
              key="descend"
              prefixel={<Icon component={<SortZaM />} />}
              suffixel={<CheckIcon isActive={columnSortOrder === 'descend'} />}
            >
              Sort z-a
            </Menu.Item>
            {/* TODO: add translation */}
            {/* TODO: add reddish background */}
            {!!columnSortOrder && (
              <Menu.Item key="null" prefixel={<Icon component={<Close2M />} />}>
                Clear
              </Menu.Item>
            )}
          </Menu>
        </Dropdown.Wrapper>
      }
    >
      <Button type="ghost" mode="single-icon">
        <StringSortIcon sortOrder={columnSortOrder} />
      </Button>
    </Dropdown>
  );
};
